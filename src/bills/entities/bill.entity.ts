import { Category } from "src/categories/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("bills")
export class Bill {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date;

    @Column()
    purchaseName:string;

    @Column()
    categoryId:number;

    @Column()
    description:string;

    @Column()
    value:number;

    @ManyToOne(()=>Category,category=>category.bill,{eager:true})
    category:Category;
}





















/*

Hacer un estado que cuando se cree un build se guarde al local storage 

*/ 