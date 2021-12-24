import { RentsEntity } from "src/rent/entities/rent.entity.";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ICar } from "../interfaces/car";

@Entity({
  name:"car"
})

export class CarsEntity implements ICar{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false,type:"text"})
  brand: string;

  @Column({nullable: false,type:"text"})
  model: string;

  @Column({nullable: false,type:"text"})
  licensePlate: string;
   
  @Column({nullable:false,type:'date',default:new Date()})
  lastOrder:Date

  @Column({nullable: false,type:"text"})
  vin: string;

  @OneToMany(() => RentsEntity, rent => rent.car)
  rent: RentsEntity[]
}