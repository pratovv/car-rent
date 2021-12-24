import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { getEnabledCategories } from "trace_events";
import { CreateOrdersDto } from "./dto/create-rent.dto";
import { RentService } from "./rent.service";

@Controller()
export class RentController {
    constructor(private readonly RentService: RentService) { }
    @Get('')
    async getOrders() {
        return this.RentService.getOrders();
    }
    @Get('active')
    async getActiveOrders(@Param('id') id: number) {
        return this.RentService.getActiveOrders(id)
    }
    @Post()
    async createOrder(@Body() orderDto: CreateOrdersDto) {
        return this.RentService.createOrder(orderDto)
    }
    @Delete()
    async deleteOrder(@Param('id') id: number) {
        return this.RentService.deleteOrder(id)
    }
    

}