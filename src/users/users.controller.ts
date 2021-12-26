import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dto/create-users.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { localAuthGuard } from "src/auth/guards/local-auth.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService

    ) { }
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({ description: 'New user will be created', status: 201 })
    @Post('register')
    async register(@Body() newUser: CreateUsersDto) {
        return this.usersService.register(newUser)
    }
    
    @UseGuards(localAuthGuard)
    @ApiOperation({ summary: 'Login operation' })
    @ApiResponse({ description: 'Successfully logged in', status: 200 })
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user info operation' })
    @ApiResponse({ description: 'User info', status: 200 })
    @ApiResponse({ description: 'Unauthorized', status: 401 })
    @Get('')
    async getUser(@Request() req) {
        const user = await this.usersService.findOne(req.user.username);
        const { password, ...rest } = user
        return rest
    }

}
