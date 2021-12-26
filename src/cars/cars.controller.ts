import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CarsService } from "./cars.service";
import { CreateCarsDto } from "./dto/create-cars.dto";
import { UpdateCarsDto } from "./dto/update-cars.dto";
import { CarsEntity } from "./entities/cars.entity";

@ApiTags('Car')
@Controller('/cars')
export class CarsController {
    constructor(private readonly CarsService: CarsService) { }
    
    
    @ApiOperation({ summary: 'Get all cars' })
    @ApiOkResponse({ type: [CarsEntity] })
    @Get('')
    getCars() {
        return this.CarsService.getCars()
    }
    
    @ApiOperation({ summary: 'Get car by id' })
    @ApiOkResponse({ type: CarsEntity })
    @ApiNotFoundResponse({ description: `Мишина не найдена` })
    @Get(':id')
    getCarById(@Param('id') id: number) {
        return this.CarsService.getCarById(id);
    }

    
    @ApiOperation({ summary: 'Create new car' })
    @ApiCreatedResponse({type:CarsEntity})
    @ApiConflictResponse({ description: `Данная машина зарегестрирована` })
    @Post()
    createCar(@Body() carDto: CreateCarsDto) {
        return this.CarsService.createCar(carDto)
    }
    
    @ApiOperation({ summary: 'Update car' })
    @ApiOkResponse({ type: CarsEntity })
    @ApiNotFoundResponse({ description: `Данная машина не найдена` })
    @Put('update')

    updateCar(@Body() carDto: UpdateCarsDto, @Param('id') id: number) {
        return this.CarsService.updateCar(Number(id), carDto);
    }


    @ApiOperation({ summary: 'Delete car' })
    @ApiOkResponse({type:CarsEntity})
    @ApiNotFoundResponse({ description: `Машина с таким id не найдена` })
    @Delete(':id')
    deleteCar(@Param('id') id: number) {
        return this.CarsService.deleteCar(id)
    }
}
