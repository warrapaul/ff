import { MigrationInterface, QueryRunner } from "typeorm";

export class Updaterole1694544205462 implements MigrationInterface {
    name = 'Updaterole1694544205462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`test\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`test\` int NOT NULL`);
    }

}
