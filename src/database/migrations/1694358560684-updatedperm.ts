import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatedperm1694358560684 implements MigrationInterface {
    name = 'Updatedperm1694358560684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`isActive\``);
    }

}
