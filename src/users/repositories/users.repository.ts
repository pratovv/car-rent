import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UsersEntity  } from "../entities/users.entity";

@Injectable()
@EntityRepository(UsersEntity )
export class UsersRepository extends Repository<UsersEntity >{}