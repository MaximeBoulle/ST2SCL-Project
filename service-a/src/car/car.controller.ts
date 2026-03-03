import { Controller, Get, Post, Put, Delete, Body, Param, OnModuleInit, Inject } from '@nestjs/common';
import * as grpc from '@nestjs/microservices';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Observable, lastValueFrom } from 'rxjs';
import { CreateCarDto, UpdateCarDto } from './car.dto';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  isAvailable: boolean;
}

interface CarServiceClient {
  createCar(data: any): Observable<Car>;
  findAllCars(data: any): Observable<{ cars: Car[] }>;
  findOneCar(data: { id: number }): Observable<Car>;
  updateCar(data: any): Observable<Car>;
  removeCar(data: { id: number }): Observable<{ success: boolean }>;
}

@ApiTags('cars')
@Controller('cars')
export class CarController implements OnModuleInit {
  private carService: CarServiceClient;

  constructor(@Inject('CAR_PACKAGE') private client: grpc.ClientGrpc) {}

  onModuleInit() {
    this.carService = this.client.getService<CarServiceClient>('CarService');
  }

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  async create(@Body() createCarDto: CreateCarDto) {
    return lastValueFrom(this.carService.createCar(createCarDto));
  }

  @Get()
  @ApiOperation({ summary: 'List all cars' })
  async findAll() {
    return lastValueFrom(this.carService.findAllCars({}));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one car by ID' })
  async findOne(@Param('id') id: string) {
    return lastValueFrom(this.carService.findOneCar({ id: +id }));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a car' })
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return lastValueFrom(this.carService.updateCar({ id: +id, ...updateCarDto }));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a car' })
  async remove(@Param('id') id: string) {
    return lastValueFrom(this.carService.removeCar({ id: +id }));
  }
}
