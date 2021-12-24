import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarsDto } from "./dto/create-cars.dto";
import { UpdateCarsDto } from "./dto/update-cars.dto";

@Controller('/cars')
export class CarsController {
    constructor(private readonly CarsService: CarsService) { }
    @Get('')
    getCars() {
        return this.CarsService.getCars()
    }
    @Get(':id')
    getCarById(@Param('id') id: number) {
        return this.CarsService.getCarById(id);
    }
    @Post()
    createCar(@Body() carDto: CreateCarsDto) {
        return this.CarsService.createCar(carDto)
    }
    @Put(':id')
    updateCar(@Body() carDto: UpdateCarsDto, @Param('id') id: number) {
        return this.CarsService.updateCar(id, carDto);
    }
    @Delete(':id')
    deleteCar(@Param('id') id: number) {
        return this.CarsService.deleteCar(id)
    }
}
