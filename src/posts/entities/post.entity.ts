import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ProjBaseEntity } from "src/common/entity/base-entity";
import { User } from "src/users/entities/user.entity";
import { PostCategoryEnum, PostStatusEnum } from "../enums";

@Entity()
export class Post extends ProjBaseEntity{
   
    @Column()
    title: string;

    @Column({type:'enum', enum:PostStatusEnum, default:PostStatusEnum.PENDING})
    status:string;

    @Column({type:'set', enum:PostCategoryEnum, default:[PostCategoryEnum.LOCAL, PostCategoryEnum.NEWS]})
    category:PostCategoryEnum[]

    @Column({type:'longtext'})
    description: string;

    @Column({nullable: true})
    mainImage:string;

    @ManyToOne(()=>User, (user)=>user.posts)
    @JoinColumn({name:'authorId'})
    author:User
}
