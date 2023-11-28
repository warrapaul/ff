import { Chamaa } from "src/chamaa/entities/chamaa.entity";
import { ProjBaseEntity } from "src/common/entity/base-entity";
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

    @Column({type:'decimal'})
    currentBalance: number;
}