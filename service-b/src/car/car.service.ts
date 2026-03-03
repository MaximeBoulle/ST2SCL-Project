import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(carData: Partial<Car>): Promise<Car> {
    const car = this.carRepository.create(carData);
    return await this.carRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  async update(id: number, carData: Partial<Car>): Promise<Car> {
    await this.carRepository.update(id, carData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.carRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
