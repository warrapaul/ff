import { Exclude } from "class-transformer";
import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Post } from "src/posts/entities/post.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAccStatusEnum } from "../enums";
import { ApiProperty } from "@nestjs/swagger";
import { ChamaaOfficial } from "src/chamaa/entities/chamaa-officials.entity";
import { Chamaa } from "src/chamaa/entities/chamaa.entity";
import { UserProfile } from "./user-profile.entity";
import { UserAccount } from "./user-account.entity";

@Entity()
export class User extends ProjBaseEntity {
    @Column()
    firstName: string;

    @Column({nullable: true})
    middleName: string;

    @Column()
    lastName: string;
   
    @Column()
    nationalId: number;    

    @Column({unique: true})
    email: string;

    @Column()
    phoneNumber: string;   
 
    @Column({type:'enum', enum:UserAccStatusEnum, default:UserAccStatusEnum.ACTIVE})
    status: string;

    @Column()
    password: string;
    
    @Column()
    hashRt: string;

    @ManyToOne(()=>Role,(role)=>role.users)
    role:Role;

    @OneToOne(()=>UserProfile, userProfile => userProfile.user)
    userProfile: UserProfile

    @OneToOne(()=>UserAccount, userAccount => userAccount.user)
    userAccount: UserAccount
    
}





