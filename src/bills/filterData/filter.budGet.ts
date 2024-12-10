import { Injectable } from "@nestjs/common";
import { ManageError } from "src/common/errors/custom/error.custom";
import { CategoriesService } from "src/categories/categories.service";
import { Category } from "src/categories/entities/category.entity";
import { BudgetService } from "src/budget/budget.service";
import { Budget } from "src/budget/entities/budget.entity";

interface argumentsFilterBills{
    userId:number;
    categoryId:number;
}


@Injectable()
export class FilterBillService{
    constructor(
        private categoryService:CategoriesService,
        private budGetService:BudgetService
    ){}

    async filterDataGeneral(data:argumentsFilterBills):Promise<boolean>{
        try{
            await this.VerifyCategory(data.categoryId,data.userId);
            return true;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }

    private async VerifyCategory(categoryId:number,userId:number):Promise<Boolean>{
        try{
            console.log("THE ID USER IS");
            console.log(userId);
            
            const findCategory:Category = await this.categoryService.findOne(categoryId);
            
            const findBudGet:Budget | any= await this.budGetService.findOneByIdBudget(findCategory.idBudget);

            console.log(findCategory);
            

            console.log(findBudGet);
            
            
            if(findBudGet.idUser !== userId){
                throw new ManageError({
                    type:"CONFLICT",
                    message:"THIS CATEGORY IS NOT THAT USER"
                });
            }
            return true;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
}