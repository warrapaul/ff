import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedProfilePic1702011971641 implements MigrationInterface {
    name = 'AddedProfilePic1702011971641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_profile\` ADD \`profilePic\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_profile\` DROP COLUMN \`profilePic\``);
    }

}
