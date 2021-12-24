import { EntityRepository, Repository } from "typeorm";
import { CarsEntity } from "../entities/cars.entity";


@EntityRepository(CarsEntity)
export class CarsRepository extends Repository<CarsEntity> { }