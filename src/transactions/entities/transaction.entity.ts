import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { TransactionMethodEnum, TransactionTypeEnum } from "../enums/transactions.enums";
import { User } from "src/users/entities/user.entity";
import { Chamaa } from "src/chamaa/entities/chamaa.entity";

export class Transaction  extends ProjBaseEntity{
    @ManyToOne(()=> User)
    @JoinColumn({name: 'userId'})
    user: User

    @ManyToOne(()=>Chamaa)
    @JoinColumn({name: 'chamaaId'})
    chamaa: Chamaa

    @Column()
    transactionType: TransactionTypeEnum

    @Column()
    transactionMethod: TransactionMethodEnum

    @Column({type:'decimal'})
    amount: number;

    //mpesa ref or random uuid for cash
    @Column()
    trasactionReference: string;

    @Column({type: 'text', nullable: true})
    note: string;
    

}
