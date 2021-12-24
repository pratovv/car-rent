import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dto/create-users.dto";
@Controller('/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }
    @Post('register')
    register(@Body() newUser: CreateUsersDto) {
        return this.usersService.register(newUser)
    }
    @Get('')
    getUser(@Param('id') id: number) {
        return this.usersService.findOne(id)
    }

}
