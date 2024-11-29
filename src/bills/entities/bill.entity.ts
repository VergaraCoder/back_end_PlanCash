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
    categoryId:number;

    @Column()
    amount:number;

    @ManyToOne(()=>Category,category=>category.bill)
    category:Category;
}





















/*

Hacer un estado que cuando se cree un build se guarde al local storage 

*/ 