import { Injectable } from "@nestjs/common";
import { ManageError } from "src/common/errors/custom/error.custom";
import { CategoriesService } from "src/categories/categories.service";
import { Category } from "src/categories/entities/category.entity";

interface argumentsFilterBills{
    userId:number;
    categoryId:number;
    amount:number;

}


@Injectable()
export class FilterBillService{
    constructor(
        private categoryService:CategoriesService,
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
            const findCategory:Category = await this.categoryService.findOne(categoryId);

            if(findCategory.budget.user.id !== userId){
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