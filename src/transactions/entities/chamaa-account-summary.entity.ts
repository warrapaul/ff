import { Chamaa } from "src/chamaa/entities/chamaa.entity";
import { ProjBaseEntity } from "src/common/entity/base-entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

// @Entity()
// export class ChamaaAccountSummary extends ProjBaseEntity{
//     @OneToOne(()=>Chamaa)
//     @JoinColumn({name:'chamaaId'})
//     chamaa: Chamaa;

//     @Column({type:'decimal'})
//     currentBalance: number;
// }