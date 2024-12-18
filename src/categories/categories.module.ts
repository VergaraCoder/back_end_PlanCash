import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BudgetModule } from 'src/budget/budget.module';
import { FilterCategories } from './filterData/filter.budGet';
import { BillsModule } from 'src/bills/bills.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Category]),
    AuthModule,
    BudgetModule,
    forwardRef(()=>BillsModule)
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    FilterCategories
  ],
  exports:[
    TypeOrmModule,
    CategoriesService
  ]
})
export class CategoriesModule {}
