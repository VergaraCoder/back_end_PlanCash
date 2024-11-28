import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FilterCategory } from './filterData/filter.category';

@Module({
  imports:[
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    FilterCategory
  ],
  exports:[
    TypeOrmModule,
    CategoriesService
  ]
})
export class CategoriesModule {}
