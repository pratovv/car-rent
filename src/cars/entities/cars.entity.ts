import { ApiProperty } from "@nestjs/swagger";
import { RentsEntity } from "src/rent/entities/rent.entity.";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ICar } from "../interfaces/car";

@Entity({
  name:"car"
})

export class CarsEntity implements ICar{
  
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty()
  @Column({nullable: false,type:"text"})
  brand: string;
  
  @ApiProperty()
  @Column({nullable: false,type:"text"})
  model: string;
  
  @ApiProperty()
  @Column({nullable: false,type:"text"})
  licensePlate: string;
  
  @ApiProperty()
  @Column({nullable:false,type:'date',default:new Date()})
  lastOrder:Date
  
  @ApiProperty()
  @Column({nullable: false,type:"text"})
  vin: string;

  @OneToMany(() => RentsEntity, rent => rent.car)
  rent: RentsEntity[]
}