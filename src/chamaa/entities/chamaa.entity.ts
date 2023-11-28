import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { ChamaaOfficial } from "./chamaa-officials.entity";
import { User } from "src/users/entities/user.entity";
import { ChamaaStatusEnum } from "src/users/enums";
import { UserAccount } from "src/users/entities/user-account.entity";
import { ChamaaProfile } from "./chamaa-profile.entity";

@Entity()
export class Chamaa extends ProjBaseEntity {

    @Column()
    name: string;

    @Column({ type: 'text' }) // 'text' type can hold longer descriptions
    description: string;

    @Column({nullable: true})
    registrationNumber: string;


    @OneToMany(() => ChamaaOfficial, official => official.chamaa)
    officials: ChamaaOfficial[];


    @Column({type: 'enum', enum: ChamaaStatusEnum, default: ChamaaStatusEnum.PENDING_APPROVAL})
    status: ChamaaStatusEnum;

   
    @OneToOne(()=>ChamaaProfile, chamaaProfile => chamaaProfile.chamaa)
    chamaaProfile: ChamaaProfile
    //payment - monthly payments, registration fee, - features..
}





/**
 * payment module
 * id, <mpesa code>(airtel, bank), amount, timestamp, userId, <chamaaId/default>,
 * 
 * create payment methods
 * mpesa, airtel, cash
 * 
 * cash
 * amount, user, chamaa, timestamp, insertedBy,
 */