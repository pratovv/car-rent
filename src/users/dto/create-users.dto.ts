import { ApiProperty } from "@nestjs/swagger"

export class CreateUsersDto{
    
    @ApiProperty()
    readonly firstname?: string
    
    @ApiProperty()
    readonly lastname?: string
    
    @ApiProperty()
    readonly username?: string
    
    @ApiProperty()
    readonly password?: string
}