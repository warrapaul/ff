import { Chamaa } from "src/chamaa/entities/chamaa.entity";
import { ProjBaseEntity } from "src/common/entity/base-entity";
import { ColumnNumericTransformer } from "src/common/transformers/colunm-numeric.transformer";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class UserAccountSummary extends ProjBaseEntity{
    @ManyToOne(()=>User)
    @JoinColumn({name:'userId'})
    user: User;

    @ManyToOne(()=>Chamaa)
    @JoinColumn({name:'chamaaId'})
    chamaa: Chamaa;

    @Column({ 
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new ColumnNumericTransformer() 
    })
    currentBalance: number;
}