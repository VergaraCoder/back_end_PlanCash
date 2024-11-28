import { Bill } from "src/bills/entities/bill.entity";
import { Budget } from "src/budget/entities/budget.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique: true})
    email:string;

    @Column()
    password:string;

    @OneToMany(()=>Category,category=>category.user)
    category:Category[];

    @OneToMany(()=>Budget,budget=>budget.user)
    budGet:Budget[];
}
