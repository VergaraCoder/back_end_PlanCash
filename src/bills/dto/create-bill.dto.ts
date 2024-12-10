import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBillDto {
    @IsOptional()
    @IsNumber()
    categoryId?:number;

    @IsOptional()
    @IsNumber()
    value?:number;

    @IsOptional()
    @IsString()
    date?:string;

    @IsOptional()
    @IsNumber()
    userId?:number;
}
