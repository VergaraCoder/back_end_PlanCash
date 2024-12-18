import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
    @Inject(forwardRef(() => CategoriesService)) // Solucionar la dependencia circular
    private categoryService: CategoriesService,
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


  async createAll(createBillDto: any[]) {
    try{
      let arrayOldBills=[];
      let arrayBillToDelete=[];
      for(const x of createBillDto){
        // const category=await this.categoryService.findOne(x.categoryId);
        // const updateAmount= category.disponible - x.value;
        // await this.categoryService.update(x.categoryId,{disponible:updateAmount});

        if(x.alreadyCreated && x.alreadyCreated){
          arrayBillToDelete.push(x);
          continue;
        }
        if(x.alreadyCreated){
          arrayOldBills.push(x);
        }
        delete x.id;
        const dataBill=this.billRepository.create(x);
        await this.billRepository.save(dataBill);
      }
      
      if(arrayOldBills.length > 0){
        await this.updateAllBills(arrayOldBills);
      }
      if(arrayBillToDelete.length>0){
        await this.deleteAllBills(arrayBillToDelete);
      }
      return true;
    }catch(err:any){
      throw err;
    }
  }


  async findAll(idUser:number) {  // Este tiene el un categoryId
    try{
      const queryBuider= this.billRepository.createQueryBuilder('bills')

      // INNER JOIN entre bills y categories
      .innerJoin('categories', 'categories', 'categories.id = bills.categoryId') 
      .innerJoin('budgets', 'budgets', 'budgets.id = categories.idBudget')
      .where('budgets.idUser = :user', { user: idUser })

    const data = await queryBuider.getMany();
      if(data.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"No se encontraron facturas para el usuario"
        });
      }
      return data;
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



  
  async updateAllBills(dataUpdated: any[]) {
    try{
      for(const x of dataUpdated){
        const id=x.id;
        const dataToUpdated= {...x};
        delete dataToUpdated.id;
        delete dataToUpdated.alreadyCreated;

        console.log("the data id ");
        console.log(dataToUpdated);

        const {affected}= await this.billRepository.update(id,dataToUpdated);
        if(affected==0){
          throw new ManageError({
            type:"NOT_FOUND",
            message:"FAILED TO UPDATED"});
        }
      }
      return {message:"Perfectly updated"};

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



  

  async deleteAllBills(dataToDelete: 
    any
  ) {
    try{
      for(const x of dataToDelete){
        const {affected}:any= await this.billRepository.delete(x.id);

        if(affected==0){
          throw new ManageError({
            type:"NOT_FOUND",
            message:"FAILED TO DELETED"});
        }
        return "Perfectly deleted";
      }
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }


    async removeAllBiilWithCategoryId(categoryId: number) {
      try{
        const {affected}:any= await this.billRepository.delete({categoryId:categoryId});
        return "Perfectly deleted";
      }catch(err:any){
        throw ManageError.signedError(err.message);
      }
  }


}
