import { CarsEntity } from "src/cars/entities/cars.entity";
import {  Column, CreateDateColumn, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tariff } from "../enum/tariff.enum";

@Entity({
    name:"rent"
})
export class RentsEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    tariff:Tariff

    @Column()
    daysQuantity: number

    @CreateDateColumn({default:new Date()})
    createDate:Date

    @CreateDateColumn({nullable:false})
    expirationDate:Date
    
    @Column()
    km: number

    @Column()
    price: number

    @Column()
    totalPrice: number

    @ManyToOne(() => CarsEntity, car => car.rent)
    car:CarsEntity
    
}