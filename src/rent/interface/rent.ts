import { Tariff } from "../enum/tariff.enum";

export interface IRent {
    id?: number

    tariff: Tariff
    
    daysQuantity: number

    createDate: Date

    expirationDate?: Date

    km?: number

    price?: number
    
    totalPrice?: number
}
