import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("budgets")
export class Budget {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    idUser:number;

    @Column()
    generalAmount:number;

    @ManyToOne(()=>User,user=>user.budGet)
    user:User;
}
