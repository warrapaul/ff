import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, Unique } from "typeorm";
import { Chamaa } from "./chamaa.entity";
import { UserAccount } from "src/users/entities/user-account.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class ChamaaAccountHistory extends ProjBaseEntity {
    @ManyToOne(() => Chamaa)
    @JoinColumn({ name: 'chamaaId' })
    chamaa: Chamaa;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    action: string;
}