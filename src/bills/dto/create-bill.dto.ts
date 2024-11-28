import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBillDto {
    @IsNotEmpty()
    @IsNumber()
    categoryId:number;

    @IsNotEmpty()
    @IsNumber()
    amount:number;

    @IsNotEmpty()
    @IsNumber()
    userId:number;
}
