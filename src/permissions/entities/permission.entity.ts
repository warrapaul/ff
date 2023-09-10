import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission extends ProjBaseEntity {
    @Column({unique:true})
    name: string;

    @Column({nullable:true})
    description: string;

    @ManyToMany(()=>Role, (role)=>role.permissions)
    roles:Role[];

}
