import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Bill } from "src/bills/entities/bill.entity";
import { Budget } from "src/budget/entities/budget.entity";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/user/entities/user.entity";




@Injectable()
export class Credentials implements TypeOrmOptionsFactory{

    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return({
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [
               Category,User,Budget,Bill
            ],
            synchronize: true,
        });
    }
}