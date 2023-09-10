import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostStatus } from "../enums/post-status.enum";
import { PostCategory } from "../enums/post-category.enum";
import { ProjBaseEntity } from "src/common/entity/base-entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Post extends ProjBaseEntity{
   
    @Column()
    title: string;

    @Column({type:'enum', enum:PostStatus, default:PostStatus.PENDING})
    status:string;

    @Column({type:'set', enum:PostCategory, default:[PostCategory.LOCAL, PostCategory.NEWS]})
    category:PostCategory[]

    @Column({type:'longtext'})
    description: string;

    @ManyToOne(()=>User, (user)=>user.posts)
    @JoinColumn({name:'authorId'})
    author:User
}
