import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_ENTITIES } from 'utils/db_entities';
import { CarsModule } from './cars/cars.module';
import {config} from 'dotenv'
import { UsersModule } from './users/users.module';

import { RentsEntity } from './rent/entities/rent.entity.';
import { RentsModule } from './rent/rent.module';
import { AuthModule } from './auth/auth.module';
config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: DB_ENTITIES,
    autoLoadEntities:true,
    synchronize:true
  }),
    CarsModule,
    UsersModule,
    RentsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule { }
