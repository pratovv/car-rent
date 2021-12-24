export interface ICar{
    id?: number;

    brand: string;

    model: string;

    licensePlate: string;

    vin: string;

    lastOrder?:Date;
}