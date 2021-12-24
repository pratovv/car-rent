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
    async getCarById(data?): Promise<CarsEntity | null> {
        return await this.cars.findOne({ where: { data } })
    }
    async createCar(createCar: CreateCarsDto): Promise<CarsEntity> {
        const car = await this.getCarById(createCar.vin)
        if(car){
            throw new HttpException(`Данная машина зарегестрирована`,409)
        }
        return await this.cars.save(createCar)
    }
    async updateCar(id: number, updateCar: UpdateCarsDto):Promise<CarsEntity> {
        const car = await this.getCarById(updateCar.id)
        if(car){
            Object.assign(car,id)
            return await this.cars.save(car)
        }else{
            `Машина с таким id ${id} не найдена`
        }
    }
    async deleteCar(id: number): Promise<void> {
        const car = await this.getCarById(id)
        if(!car){
            throw new HttpException(`Машина с таким id ${id} не найдена`,409)
        }
        await this.cars.delete(id)
    }

}