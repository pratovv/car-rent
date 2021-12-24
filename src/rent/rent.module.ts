import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarsService } from "src/cars/cars.service";
import { CarsRepository } from "src/cars/repositories/cars.repository";
import { RentsEntity } from "./entities/rent.entity.";
import { RentController } from "./rent.controller";
import { RentService } from "./rent.service";

@Module({
    imports:[TypeOrmModule.forFeature([RentsEntity,CarsRepository])],
    controllers:[RentController],
    providers:[RentService,CarsService]
})
export class OrdersModule{}
