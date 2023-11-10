import { MigrationInterface, QueryRunner } from "typeorm";

export class MiddlenameOptionaladdedId1699600007049 implements MigrationInterface {
    name = 'MiddlenameOptionaladdedId1699600007049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`profilePic\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumberSecondary\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`idPicFront\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`idPicBack\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`middleName\` varchar(255) NULL`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`idPicBack\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`idPicFront\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumberSecondary\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`profilePic\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`middleName\` varchar(255) NOT NULL`);

    }

}
