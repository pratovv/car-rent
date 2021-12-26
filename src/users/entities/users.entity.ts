import { ApiProperty } from "@nestjs/swagger";
import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { IUsers } from "../interfaces/users";
import {bcrypt} from "bcrypt";


@Entity({
  name:"users"
})
export class UsersEntity implements IUsers{
  
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty()
  @Column({nullable: false,type:"text"})
  firstname: string;
  
  @ApiProperty()
  @Column({nullable: false,type:"text"})
  lastname: string;
  
  @ApiProperty()
  @Column({nullable: false,type:"text"})
  username: string;
  
  @ApiProperty()
  @Column({nullable: false})
  password: string;

  @BeforeInsert()  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

}