import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UsersEntity } from "./entities/users.entity";
import { UsersRepository } from "./repositories/users.repository";

export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly users: UsersRepository,
        private readonly jwtService: JwtService
    ) { }
    public async register(newuser: CreateUsersDto) {
        return await this.users.save(newuser)
    }
    async findOne(username: string): Promise<UsersEntity | undefined> {
        return await this.users.findOne({
            where: { username: username }
        })
    }
}