import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { TransactionMethodEnum, TransactionTypeEnum } from "../enums/transactions.enums";
import { User } from "src/users/entities/user.entity";
import { Chamaa } from "src/chamaa/entities/chamaa.entity";
import { ColumnNumericTransformer } from "src/common/transformers/colunm-numeric.transformer";

@Entity()
export class TransactionTbl  extends ProjBaseEntity{
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

    @Column({ 
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer() 
    })
    amount: number;

    //mpesa ref or random uuid for cash
    @Column()
    transactionReference: string;
    @Column({type: 'text', nullable: true})
    note: string;
    

}
