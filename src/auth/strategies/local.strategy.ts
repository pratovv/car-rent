import { Injectable } from "@nestjs/common";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { ApiSecurity } from "@nestjs/swagger";
import{Strategy} from "passport-local"
import { AuthService } from "../auth.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super();
    }
    async validate(username:string,password:string):Promise<any>{
        return await this.authService.validateUser(username,password)
    }
    
}