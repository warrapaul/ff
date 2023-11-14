import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, JoinColumn, ManyToMany, ManyToOne, Unique } from "typeorm";
import { Chamaa } from "./chamaa.entity";
import { User } from "src/users/entities/user.entity";

@Unique(['position', 'chamaa']) // Composite unique constraint
export class ChamaaOfficial extends ProjBaseEntity {
    
    @Column()
    position: string;

    @Column()
    roleDescription: string;

    @ManyToOne(() => Chamaa, chamaa => chamaa.officials)
    @JoinColumn({ name: 'chamaaId' })
    chamaa: Chamaa;

    @ManyToOne(() => User, user => user.officials)
    user: User;
}