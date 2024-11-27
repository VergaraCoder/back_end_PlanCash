import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BudgetModule } from './budget/budget.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from './common/db/db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule, BudgetModule, CategoriesModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useClass:Credentials
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
