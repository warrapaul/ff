import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { ChamaaOfficial } from "src/chamaa/entities/chamaa-officials.entity";
import { Chamaa } from "src/chamaa/entities/chamaa.entity";
import { ChamaaProfile } from "src/chamaa/entities/chamaa-profile.entity";


@Entity()
export class UserAccount extends ProjBaseEntity{
    @OneToOne(()=>User, user=>user.userProfile)
    @JoinColumn({name:'userId'})
    user: User;

    @Column({unique:true})
    accountNumber: number;

    @OneToMany(() => ChamaaOfficial, official => official.userAccount)
    officials: ChamaaOfficial[];


    @OneToMany(()=>ChamaaProfile, chamaaProfile=> chamaaProfile.createdBy)
    createdChamaas: ChamaaProfile[];

}