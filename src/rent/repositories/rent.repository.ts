import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { RentsEntity } from "../entities/rent.entity.";

@Injectable()
@EntityRepository(RentsEntity)
export class RentRepository extends Repository<RentsEntity>{}