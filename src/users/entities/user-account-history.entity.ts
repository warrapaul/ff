import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, Unique } from "typeorm";
import { UserAccount } from "src/users/entities/user-account.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class UserAccountHistory extends ProjBaseEntity {  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'staffId' })
    staff: User;

    @Column()
    action: string;
}