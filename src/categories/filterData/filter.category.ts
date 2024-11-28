import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { ManageError } from "src/common/errors/custom/error.custom";



@Injectable()
export class FilterCategory{
    constructor(
        @InjectRepository(Category)
        private categpryRepository:Repository<Category>
    ){}

    async filterData(data:any):Promise<Boolean>{
        try{
            const dataFind= await this.categpryRepository.findOneBy({idUser:data.userId});
            if(!dataFind ){
                 throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THIS USER NOT HAVE CATEGORY"
                 })
            }

            if(dataFind.amount<data.amount){
                throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THIS USER NOT HAVE ENOUGH MONEY"
                })
            }
            return true;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
}