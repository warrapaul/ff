import { MigrationInterface, QueryRunner } from "typeorm";

export class Chamaaprofilepic1704370510079 implements MigrationInterface {
    name = 'Chamaaprofilepic1704370510079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chamaa_profile\` ADD \`profilePic\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chamaa_profile\` DROP COLUMN \`profilePic\``);
    }

}
