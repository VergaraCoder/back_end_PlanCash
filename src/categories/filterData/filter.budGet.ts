import { Injectable } from "@nestjs/common";
import { ManageError } from "src/common/errors/custom/error.custom";
import { CategoriesService } from "src/categories/categories.service";
import { Category } from "src/categories/entities/category.entity";

interface argumentsFilterCreateCategory{
    dateStart:Date;
    dateEnd:Date;
}


@Injectable()
export class FilterCategories{

    async filterDataGeneral(data:argumentsFilterCreateCategory):Promise<boolean>{
        try{
            await this.filterDate(data.dateStart, data.dateEnd);
            return true;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }

    async filterDate(dateStart:Date, dateEnd:Date):Promise<boolean>{
        try{

            const operationToOneDay= 1000*60*60*24;

            const oneMounth:number=1000*60*60*24*30;

            const DateStart:Date=new Date(dateStart);
            const DateEnd:Date=new Date(dateEnd);

            const totalDate:number=DateEnd.getTime()-DateStart.getTime();

            console.log(DateStart);
            console.log(DateEnd);
        
            
            if(oneMounth !== totalDate){

                throw new ManageError({
                    type:"CONFLICT",
                    message:"THE DATE MUST BE EXACTLY ONE MOUNTH"
                });
            }

            return true;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
}



