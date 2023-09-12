import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Permission } from "src/permissions/entities/permission.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role  extends ProjBaseEntity{
    @Column({unique:true})
    name: string;

    @Column({nullable:true})
    description: string;

    @Column({type:'bool', default:true})
    isActive: boolean;
    
    @ManyToMany(()=>Permission)
    @JoinTable()
    permissions: Permission[];

    @OneToMany(()=>User, (user)=>user.role)
    users:User[];

}
