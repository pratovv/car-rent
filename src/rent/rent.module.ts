import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarsService } from "src/cars/cars.service";
import { CarsRepository } from "src/cars/repositories/cars.repository";
import { RentController } from "./rent.controller";
import { RentService } from "./rent.service";
import { RentRepository } from "./repositories/rent.repository";

@Module({
    imports:[TypeOrmModule.forFeature([RentRepository,CarsRepository])],
    controllers:[RentController],
    providers:[RentService,CarsService]
})
export class RentsModule{}
