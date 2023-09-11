import { Exclude } from "class-transformer";
import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Post } from "src/posts/entities/post.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAccStatusEnum } from "../enums";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User extends ProjBaseEntity {
    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    phoneNumber: string;
    
    @Column({type:'enum', enum:UserAccStatusEnum, default:UserAccStatusEnum.ACTIVE})
    status: string;

    @Column()
    password: string;


    @Column({nullable:true})
    hash: string;
 
    @Column({nullable:true})
    hashRt: string;

    @ApiProperty({ type: "string" })
    @ManyToOne(()=>Role,(role)=>role.users)
    role:Role;

    @OneToMany(()=>Post, (post)=>post.author)
    posts:Post[]

}






