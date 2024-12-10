import { Budget } from 'src/budget/entities/budget.entity';
import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/errors/custom/error.custom';


interface argumentsCreateBudget{
  userId:number;

}

@Injectable()
export class BudgetService {

  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>
  ){}

  async createBudGet(createBudgetDto:any ) {
    try{
      const findOneBudGet= await this.budgetRepository.findOneBy({idUser:createBudgetDto.idUser});
      


      const dataBudget:Budget[]= this.budgetRepository.create(createBudgetDto);
      await this.budgetRepository.save(dataBudget);
      return dataBudget;

    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findAll() {
    try{
      const budgets:Budget[] | null= await this.budgetRepository.find();
      if(budgets.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT BUDGETS"
        });
      }
      return budgets;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOneByIdUser(id: number) {
    try{
      const budget:Budget | null= await this.budgetRepository.findOneBy({idUser:id});
      if(!budget){
        return await this.createBudGet({idUser:id, generalAmount:0});
      }
      return budget;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  
  async findOneByIdBudget(id: number) {
    try{
      const budget:Budget | null= await this.budgetRepository.findOneBy({id});
      if(!budget){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"EL MONTO GENERAL NO EXISTE"
        });
      }
      return budget;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }


  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
    try{
      const {affected}=await this.budgetRepository.update(id,updateBudgetDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"
        });
      }
      return "Perfectly updated";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{

      const {affected}=await this.budgetRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETED"
        });
      }
      return "Perfectly deleted";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
