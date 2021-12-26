import { ApiProperty } from "@nestjs/swagger"

export class CreateCarsDto{
    
    @ApiProperty()
    readonly id?: number
    
    @ApiProperty()
    readonly brand?: string
    
    @ApiProperty()
    readonly model?: string
    
    @ApiProperty()
    readonly licensePlate?: string
    
    @ApiProperty()
    readonly vin?: string
}   