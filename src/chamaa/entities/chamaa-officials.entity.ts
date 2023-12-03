import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, Unique } from "typeorm";
import { Chamaa } from "./chamaa.entity";
import { UserAccount } from "src/users/entities/user-account.entity";

@Entity()
@Unique(['position', 'chamaa']) // Composite unique constraint
export class ChamaaOfficial extends ProjBaseEntity {
    
    @Column()
    position: string;

    @Column()
    roleDescription: string;

    @ManyToOne(() => Chamaa, chamaa => chamaa.officials)
    @JoinColumn({ name: 'chamaaId' })
    chamaa: Chamaa;

    @ManyToOne(() => UserAccount, userAccount => userAccount.officials, {nullable:true})
    @JoinColumn({ name: 'userAccountId' })
    userAccount?: UserAccount;
}