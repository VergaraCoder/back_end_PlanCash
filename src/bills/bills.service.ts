import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/errors/custom/error.custom';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class BillsService {

  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    private categoryService: CategoriesService
  ){}

  async create(createBillDto: CreateBillDto) {
    try{
      const date:Date=new Date();
      const dataBill=this.billRepository.create({...createBillDto,date});

      const category= await this.categoryService.findOne(createBillDto.categoryId);

      const updateAmount= category.amount - createBillDto.value;

      await this.categoryService.update(createBillDto.categoryId,{amount:updateAmount});

      await this.billRepository.save(dataBill);
      return dataBill;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const bills:Bill[] | null= await this.billRepository.find();
      if(bills.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT BILLS"});
      }
      return bills; 
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const bill:Bill | null= await this.billRepository.findOneBy({id});
      if(!bill){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT BILLS"});
      }
      return bill; 
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    try{
      const {affected}:any= await this.billRepository.update(id,updateBillDto);

      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"});
      }
      return "Perfectly updated";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}:any= await this.billRepository.delete(id);

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
