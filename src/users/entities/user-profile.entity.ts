import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserProfile extends ProjBaseEntity{
    @OneToOne(()=>User, user=>user.userProfile)
    @JoinColumn({name:'userId'})
    user: User;

    @Column({nullable: true})
    gender?: string; 
    
    @Column({nullable: true})
    dob?: Date;

    @Column({nullable: true})
    phoneNumberSecondary: string;


    @Column({nullable:true})
    idPicFront?: string;

    @Column({nullable:true})
    idPicBack?: string;
}