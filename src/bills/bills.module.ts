import { forwardRef, Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilterBillService } from './filterData/filter.budGet';
import { CategoriesModule } from 'src/categories/categories.module';
import { BudgetModule } from 'src/budget/budget.module';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill]),
    UserModule,
    AuthModule,
    forwardRef(()=>CategoriesModule),
    BudgetModule
  ],
  controllers: [BillsController],
  providers: [
    BillsService,
    FilterBillService,
  ],
  exports: [
    TypeOrmModule,
    BillsService
  ],
})
export class BillsModule {}
