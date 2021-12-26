import { HttpException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService) { }
    async validateUser(username: string, password1: string): Promise<any> {
        const user = await this.usersService.findOne(username)

        if (!user) {
            throw new HttpException(`Такого пользователя нет`, 401)
        } else if (user && user.password !== password1) {
            throw new HttpException(`Пароль введен неверно`, 404)
        }
        const { password, ...res } = user;
        return res
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
