import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatedperm1694358677152 implements MigrationInterface {
    name = 'Updatedperm1694358677152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`isActive\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`);
    }

}
