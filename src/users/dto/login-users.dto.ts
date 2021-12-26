import { ApiProperty } from "@nestjs/swagger"

export class UpdateUsersDto{
    
    @ApiProperty()
    readonly username?: string
    
    @ApiProperty()
    readonly password?: string|number
}