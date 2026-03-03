import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CarController } from './car/car.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CAR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'car',
          protoPath: join(__dirname, '../proto/car.proto'),
          url: process.env.SERVICE_B_URL || 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [CarController],
})
export class AppModule {}
