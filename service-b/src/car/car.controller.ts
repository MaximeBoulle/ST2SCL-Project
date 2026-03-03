import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CarService } from './car.service';
import { Car } from './car.entity';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @GrpcMethod('CarService', 'CreateCar')
  async createCar(data: Partial<Car>): Promise<Car> {
    return this.carService.create(data);
  }

  @GrpcMethod('CarService', 'FindAllCars')
  async findAllCars(): Promise<{ cars: Car[] }> {
    const cars = await this.carService.findAll();
    return { cars };
  }

  @GrpcMethod('CarService', 'FindOneCar')
  async findOneCar(data: { id: number }): Promise<Car> {
    return this.carService.findOne(data.id);
  }

  @GrpcMethod('CarService', 'UpdateCar')
  async updateCar(data: Partial<Car>): Promise<Car> {
    if (!data.id) throw new Error('Car ID is required for update');
    return this.carService.update(data.id, data);
  }

  @GrpcMethod('CarService', 'RemoveCar')
  async removeCar(data: { id: number }): Promise<{ success: boolean }> {
    const success = await this.carService.remove(data.id);
    return { success };
  }
}
