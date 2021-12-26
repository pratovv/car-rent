import { Controller, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { UsersEntity } from "./entities/users.entity";
import { UsersRepository } from "./repositories/users.repository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersRepository]),
        JwtModule.register({
            secret:"secret",
            signOptions:{
                expiresIn:'5m'
            }
        })
    ],
    controllers: [UsersController],
    providers: [UsersService,AuthService],
    exports:[UsersService]
})
export class UsersModule { }