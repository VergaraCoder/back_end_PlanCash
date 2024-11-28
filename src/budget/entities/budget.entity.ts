import { Category } from "src/categories/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("budgets")
export class Budget {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    idUser:number;

    @Column()
    generalAmount:number;

    @ManyToOne(()=>User,user=>user.budGet,{eager:true})
    user:User;

    @OneToMany(()=>Category,category=>category.budget)
    category:Category[];
}
