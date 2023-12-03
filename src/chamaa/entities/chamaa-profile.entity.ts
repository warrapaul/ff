import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Chamaa } from "./chamaa.entity";
import { UserAccount } from "src/users/entities/user-account.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class ChamaaProfile extends ProjBaseEntity {

    @OneToOne(()=>Chamaa, chamaa=>chamaa.chamaaProfile)
    @JoinColumn({name:'chamaaId'})
    chamaa: Chamaa

    @ManyToOne(()=>UserAccount, userAccount => userAccount.createdChamaas)
    createdBy: UserAccount;

    @Column({nullable: true})
    locationCounty?: string;

    @Column({nullable: true})
    locationSubCounty?: string;

    @Column({nullable: true})
    locationWard?: string;

}