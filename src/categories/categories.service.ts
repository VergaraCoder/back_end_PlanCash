import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ManageError } from 'src/common/errors/custom/error.custom';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { BudgetService } from 'src/budget/budget.service';
import { Budget } from 'src/budget/entities/budget.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private budGetService:BudgetService
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    try{
      console.log("ENTER TO CREATE");
      console.log(createCategoryDto);
      
      const generalBudGet:any=await this.budGetService.findOneByIdBudget
      (createCategoryDto.idBudget);

      console.log(generalBudGet);
      

      if(generalBudGet.generalAmount < createCategoryDto.amount){
        throw new ManageError({
          type:"CONFLICT",
          message:"El presupuesto destinado para la categoria excede el presupuesto general"
        });
      }

      
      const category:Category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);

      await this.budGetService.update(createCategoryDto.idBudget,
      {generalAmount:generalBudGet.generalAmount-createCategoryDto.amount});

      return category;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findAll() {
    try{
      const categorys:Category[] | null= await this.categoryRepository.find();
      if(categorys.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT CATEGORIES"});
      }
      return categorys;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }


  async findAllById(id:number) {
    try{
      const categorys:Category[] | null= await this.categoryRepository.findBy({id});
      return categorys;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
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

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try{
      console.log(
      "ENTER TO UPDATEDDDDDDDDDDDDDDDDD"
      );

      console.log(id);
      console.log(updateCategoryDto);
      
      
      
      const {affected}= await this.categoryRepository.update(id,updateCategoryDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"});
      }
      return {message:"Perfectly updated"};
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}= await this.categoryRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETED"});
      }
      return "Perfectly deleted";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
