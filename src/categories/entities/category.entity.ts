import { Bill } from "src/bills/entities/bill.entity";
import { Budget } from "src/budget/entities/budget.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    idBudget:number;

    @Column()
    dateStart:Date;

    @Column()
    dateEnd:Date;

    @Column()
    amount:number;

    @Column()
    disponible:number;

    @ManyToOne(()=>Budget,budget=>budget.category,{eager:true})
    budget:Budget;

    @OneToMany(()=>Bill,bill=>bill.category)
    bill:Bill[];
}
