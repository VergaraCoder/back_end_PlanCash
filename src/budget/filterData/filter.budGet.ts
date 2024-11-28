import { Injectable } from "@nestjs/common";
import { Budget } from "../entities/budget.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ManageError } from "src/common/errors/custom/error.custom";



@Injectable()
export class FilterBadGet{
    constructor(
        @InjectRepository(Budget)
        private budgetRepository:Repository<Budget>
    ){}

    async filterData(data:any):Promise<Boolean>{
        try{
            const dataBudget:Budget | null= await this.budgetRepository.findOneBy({idUser:data.userId});
            if(!dataBudget){
                throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THIS USER NOT HAVE BUDGET"
                })
            }

            if(dataBudget.generalAmount<data.amount){
                throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THIS USER NOT HAVE ENOUGH MONEY"
                })
            }
            return true;
        }catch(err:any){

        }
    }
}