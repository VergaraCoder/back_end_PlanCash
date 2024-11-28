import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ManageError } from 'src/common/errors/custom/error.custom';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ){}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
  }

  async findOne(id: number) {
    try{
      const category:Category | null= await this.categoryRepository.findOneBy({id});
      if(!category){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT CATEGORIES"});
      }
      return category;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
