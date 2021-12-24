import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarsService } from "src/cars/cars.service";
import { CarsEntity } from "src/cars/entities/cars.entity";
import { MoreThan  } from "typeorm";
import { CreateOrdersDto } from "./dto/create-rent.dto";
import { RentsEntity } from "./entities/rent.entity.";
import { Tariff } from "./enum/tariff.enum";
import { RentRepository } from "./repositories/rent.repository";


@Injectable()
export class RentService {
    constructor(
        @InjectRepository(RentRepository)
        private readonly rent: RentRepository,
        private readonly carService: CarsService
    ) { }
    async getOrders(): Promise<RentsEntity[]> {
        return await this.rent.find()
    }
    async getActiveOrders(id): Promise<RentsEntity | null> {
        return await this.rent.findOne({ id })
    }
    async createOrder(dto: CreateOrdersDto) {
        if (dto.daysQuantity > 30) {
            throw new HttpException(`Максимальный срок аренды 30 дней`, 400)
        }
        dto.expirationDate = new Date(dto.creationDate)

        if (dto.expirationDate.getDay() === 0 || dto.expirationDate.getDay() === 6) {
            throw new HttpException(`Начало даты аренды не может выпадать на выходной день (суббота, воскресенье)`, 400)
        }
        dto.expirationDate.setDate(dto.expirationDate.getDate() + dto.daysQuantity)
        if (dto.expirationDate.getDay() === 0 || dto.expirationDate.getDay() === 6) {
            throw new HttpException(
                `конец аренды не может выпадать на выходной день (суббота, воскресенье).`, 400
            )
        }
        const car: CarsEntity = await this.carService.getCarById({
            id: dto.car.id,
            lastOrderDate: MoreThan(dto.creationDate)
        })
        if (!car) {
            throw new HttpException('В это время свободных машин нет', 404)
        }
        const lastOrder = new Date(car.lastOrder)
        lastOrder.setDate(Number(lastOrder.getDate()) + 3)
        if (lastOrder > dto.creationDate) {
            throw new HttpException(`Пауза между бронированиями должна составлять 3 дня`, 404)
        }
        const tariff = await this.tariffs(dto.tariff)
        Object.assign(dto,tariff)
        const res = Number(dto.daysQuantity) * Number(dto.price)
        dto.totalPrice = await this.calcDiscount(res, dto.daysQuantity)
        dto.km *= Number(dto.daysQuantity)
        return await this.rent.save(dto)
    }
    async deleteOrder(id: number) {
        const rented = await this.rent.findOne({ id })
        if (!rented) {
            throw new HttpException(`Эта бронь не найдена`, 404)
        }
        return await this.rent.delete(rented)
    }
    async tariffs(tariff: Tariff){
        switch (tariff) {
            case Tariff.first:
                return { price: 270, km: 200 }
            case Tariff.second:
                return { price: 330, km: 350 }
            case Tariff.third:
                return { price: 390, km: 500 }
        }
    }
    async findNewPrice(price: number, days: number) {
        switch (true) {
            case days > 2 && days < 6:
                return await this.calcDiscount(price, 5)
            case days > 5 && days < 15:
                return await this.calcDiscount(price, 10)        
            case days > 14 && days < 31:
                return await this.calcDiscount(price, 15)
            default:
                return price
        }
    }
    async calcDiscount(price:number,reduction:number){
        return price*(100-reduction)/100
    }
}