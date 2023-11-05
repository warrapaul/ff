import { MigrationInterface, QueryRunner } from "typeorm";

export class Addedprofilepic1699080783300 implements MigrationInterface {
    name = 'Addedprofilepic1699080783300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profilePic\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profilePic\``);
    }

}
