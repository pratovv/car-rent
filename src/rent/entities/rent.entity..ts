import { ApiProperty } from "@nestjs/swagger";
import { CarsEntity } from "src/cars/entities/cars.entity";
import {  Column, CreateDateColumn, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tariff } from "../enum/tariff.enum";

@Entity({
    name:"rent"
})
export class RentsEntity{
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;
    
    @ApiProperty()
    @Column()
    tariff:Tariff
    
    @ApiProperty()
    @Column()
    daysQuantity: number
    
    @ApiProperty()
    @CreateDateColumn({default:new Date()})
    createDate:Date
    
    @ApiProperty()
    @CreateDateColumn({nullable:false})
    expirationDate:Date
    
    @ApiProperty()
    @Column()
    km: number
    
    @ApiProperty()
    @Column()
    price: number
    
    @ApiProperty()
    @Column()
    totalPrice: number
    
    @ManyToOne(() => CarsEntity, car => car.rent)
    car:CarsEntity
    
}