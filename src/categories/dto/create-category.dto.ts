import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsNumber()
    idBudget:number;

    @IsNotEmpty()
    @IsNumber()
    amount:number;

    @IsNotEmpty()
    @IsNumber()
    dateStart:Date;

    @IsNotEmpty()
    @IsNumber()
    dateEnd:Date;  

    @IsNotEmpty()
    @IsString()
    name:string;
}
