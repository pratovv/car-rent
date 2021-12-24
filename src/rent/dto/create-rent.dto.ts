import { CarsEntity } from "src/cars/entities/cars.entity"
import { Tariff } from "../enum/tariff.enum"

export class CreateOrdersDto {
    id: number

    daysQuantity: number

    car: CarsEntity

    tariff: Tariff

    price?:number

    creationDate: Date

    km?:number

    totalPrice?:number

    expirationDate?: Date

}