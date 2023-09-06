import { MigrationInterface, QueryRunner } from "typeorm";

export class Addphone1694034800902 implements MigrationInterface {
    name = 'Addphone1694034800902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumber\``);
    }

}
