import { Injectable } from "@nestjs/common";
import { ManageError } from "src/common/errors/custom/error.custom";


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

            const oneMounth:number=1000*60*60*24*30;
            const oneDay:number= 1000*60*60*24;

            const currentDate= new Date();

            currentDate.setUTCHours(0,0,0,0);

            const DateStart:Date=new Date(dateStart);
            const DateEnd:Date=new Date(dateEnd);       

            let totalDate:number=DateEnd.getTime()-DateStart.getTime();

            if(DateStart.getFullYear()  !== DateEnd.getFullYear()){
                console.log("entramos a crear un nuevo date");
                
                totalDate-=oneDay
            }       
            console.log(totalDate);
            console.log(oneMounth);
            
            
            if(oneMounth !== totalDate){

                throw new ManageError({
                    type:"CONFLICT",
                    message:"LAS FECHAS DEBEN TENER UN PLAZO TOTAL DE UN MES"
                });
            }
            console.log(DateEnd < DateStart);
            console.log( DateStart< currentDate);

            console.log(DateStart);
            console.log(currentDate);
            
            
            
            if(DateEnd < DateStart || DateStart< currentDate)
            {
                throw new ManageError({
                    type:"CONFLICT",
                    message:"ENVIA TODOS LOS DATOS CORRECTAMENTE, LAS FECHAS NO SON VALIDAS"
                });
             }

            return true;
        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
}



