import { ApiProperty } from "@nestjs/swagger"
import { CarsEntity } from "src/cars/entities/cars.entity"
import { Tariff } from "../enum/tariff.enum"

export class CreateOrdersDto {
    
    @ApiProperty()
    id?: number
    
    @ApiProperty()
    daysQuantity: number
    
    @ApiProperty()
    car: CarsEntity
    
    @ApiProperty()
    tariff: Tariff
    
    @ApiProperty()
    price?:number
    
    @ApiProperty()
    creationDate: Date
    
    @ApiProperty()
    km?:number
    
    @ApiProperty()
    totalPrice?:number
    
    @ApiProperty()
    expirationDate?: Date
    
}