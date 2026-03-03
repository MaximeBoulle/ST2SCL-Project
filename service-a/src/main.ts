import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(); // Needed for Frontend
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Car Rental API')
    .setDescription('The car rental API Gateway')
    .setVersion('1.0')
    .addTag('cars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Service A (Gateway) is running on: http://localhost:${port}/api`);
}
bootstrap();
