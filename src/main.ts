import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Car Rent')
    .setDescription('Car rent API documentation')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app,document)
  const PORT = process.env.PORT
  await app.listen(PORT, () => {
    Logger.log(`Server stared on PORT ${PORT}`)
  });

}
bootstrap();
