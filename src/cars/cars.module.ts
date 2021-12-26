import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsRepository } from './repositories/cars.repository';

@Module({
  imports: [
      TypeOrmModule.forFeature([CarsRepository])    
    ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsModule],

})
export class CarsModule {}
