import { ProjBaseEntity } from "src/common/entity/base-entity";
import { Column, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { ChamaaOfficial } from "./chamaa-officials.entity";

export class Chamaa extends ProjBaseEntity {

    @Column()
    name: string;

    @Column({ type: 'text' }) // 'text' type can hold longer descriptions
    description: string;

    @Column({nullable: true})
    registrationNumber: string;

    @Column({nullable: true})
    locationCounty: string;

    @Column({nullable: true})
    locationSubCounty: string;

    @Column({nullable: true})
    locationWard: string;

    @OneToMany(() => ChamaaOfficial, official => official.chamaa)
    officials: ChamaaOfficial[];

}
