import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { getEnabledCategories } from "trace_events";
import { CreateOrdersDto } from "./dto/create-rent.dto";
import { RentsEntity } from "./entities/rent.entity.";
import { RentService } from "./rent.service";
import { RentRepository } from "./repositories/rent.repository";

@ApiTags('Rent')
@Controller('/rent')
export class RentController {
    constructor(private readonly RentService: RentService) { }
    
    @ApiOperation({ summary: 'Get all orders' })
    @ApiOkResponse({ type: [RentsEntity] })
    @Get()
    async getOrders() {
        return this.RentService.getOrders();
    }
    
    
    @ApiOperation({ summary: 'Get order by id' })
    @ApiOkResponse({type:RentsEntity})
    @ApiNotFoundResponse({description:`Данный заказ не найден`})
    @Get(':id')
    async getActiveOrders(@Param('id') id: number) {
        return this.RentService.getActiveOrders(id)
    }
    
    @ApiOperation({ summary: 'Create new order' })
    @ApiCreatedResponse({type:RentsEntity})
    @ApiConflictResponse({description:`Максимальный срок аренды - 30 дней.\n\nНачало и конец аренды не может выпадать на выходной день (суббота, воскресенье).`})
    @Post()
    async createOrder(@Body() orderDto: CreateOrdersDto) {
        return this.RentService.createOrder(orderDto)
    }

    
    @ApiOperation({ summary: 'Delete order' })
    @ApiOkResponse({description:`Машина удалена`})
    @ApiNotFoundResponse({description:`Эта бронь не найдена`})
    @Delete()
    async deleteOrder(@Param('id') id: number) {
        return this.RentService.deleteOrder(id)
    }
    

}