import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilterBillService } from './filterData/filter.budGet';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill]),
    UserModule,
    AuthModule,
    CategoriesModule
  ],
  controllers: [BillsController],
  providers: [
    BillsService,
    FilterBillService
  ],
  exports: [BillsService],
})
export class BillsModule {}
