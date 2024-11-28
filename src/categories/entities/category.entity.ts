import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    idUser:number;

    @Column()
    dateStart:Date;

    @Column()
    dateEnd:Date;

    @Column()
    amount:number;

    @ManyToOne(()=>User,user=>user.category)
    user:User;
}
