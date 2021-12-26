import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarsRepository } from "./repositories/cars.repository";
import { CarsEntity } from "./entities/cars.entity";
import { CreateCarsDto } from "./dto/create-cars.dto";
import { UpdateCarsDto } from "./dto/update-cars.dto";


@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(CarsRepository)
        private readonly cars: CarsRepository
    ) { }
    async getCars(): Promise<CarsEntity[]> {
        return await this.cars.find();
    }
    async getCarById(conditions?): Promise<CarsEntity | null> {
        const car = await this.cars.findOne(conditions)
        if(!car){
            throw new HttpException(`Мишина не найдена`,404)
        }
        return car
    }
    async findCarById(id):Promise<CarsEntity>{
        const car = await this.cars.findOne(id)
        if(!car){
            throw new HttpException(`Машина не найдена`,404)
        }
        return car
    }


    async createCar(createCar: CreateCarsDto): Promise<CarsEntity> {
        const car = await this.getCarById({ vin: createCar.vin })
        if (car) {
            throw new HttpException(`Данная машина зарегестрирована`, 409)
        }
        return await this.cars.save(createCar)

    }
    async updateCar(id: number, updateCar: UpdateCarsDto): Promise<CarsEntity> {
        const car = await this.getCarById({ id: updateCar.id })
        if (!car) {
            throw new HttpException(`Данная машина не найдена`, 404)
        }
        Object.assign(car, updateCar)
        return await this.cars.save(car)
    }
    async deleteCar(id: number): Promise<void> {
        const car = await this.getCarById(id)
        if (!car) {
            throw new HttpException(`Машина с таким id ${id} не найдена`, 409)
        }
        await this.cars.delete(id)
    }

}