import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UsersEntity  } from "./entities/users.entity";
import { UsersRepository } from "./repositories/users.repository";

export class UsersService{
    constructor(
        @InjectRepository(UsersRepository)
        private readonly users:UsersRepository,
    ){}
    async register(newuser:CreateUsersDto){
        return await this.users.save(newuser)
    }
    async findOne(id:number):Promise<UsersEntity |undefined>{
        return await this.users.findOne(id)
    }
}