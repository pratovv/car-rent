import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { IUsers } from "../interfaces/users";

@Entity({
  name:"users"
})
export class UsersEntity implements IUsers{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false,type:"text"})
  firstname: string;

  @Column({nullable: false,type:"text"})
  lastname: string;

  @Column({nullable: false,type:"text"})
  username: string;

  @Column({nullable: false})
  password: string;


}