import { Exclude } from "class-transformer";
import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Post } from "src/posts/entities/post.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAccStatusEnum } from "../enums";
import { ApiProperty } from "@nestjs/swagger";
import { ChamaaOfficial } from "src/chamaa/entities/chamaa-officials.entity";

@Entity()
export class User extends ProjBaseEntity {
    // personal info
    @Column()
    firstName: string;

    @Column({nullable: true})
    middleName: string;

    @Column()
    lastName: string;

    @Column()
    dob: Date;

    @Column()
    nationalId: number;

    @Column()
    gender: string;  

    // contact info
    @Column({unique: true})
    email: string;

    @Column()
    phoneNumber: string;

    @Column({nullable: true})
    phoneNumberSecondary: string;


    @Column({nullable:true})
    idPicFront: string;

    @Column({nullable:true})
    idPicBack: string;
 
    // account info 
    @Column({type:'enum', enum:UserAccStatusEnum, default:UserAccStatusEnum.ACTIVE})
    status: string;

    @Column()
    password: string;
    
    @Column({nullable:true})
    hashRt: string;

    @ApiProperty({ type: "string" })
    @ManyToOne(()=>Role,(role)=>role.users)
    role:Role;
  

    @OneToMany(()=>Post, (post)=>post.author)
    posts:Post[]


    @OneToMany(() => ChamaaOfficial, official => official.user)
    officials: ChamaaOfficial[];
}






