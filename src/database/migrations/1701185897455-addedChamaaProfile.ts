import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedChamaaProfile1701185897455 implements MigrationInterface {
    name = 'AddedChamaaProfile1701185897455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chamaa\` DROP FOREIGN KEY \`FK_d677366c610943ed4ae5cfd2b87\``);
        await queryRunner.query(`CREATE TABLE \`chamaa_profile\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`locationCounty\` varchar(255) NULL, \`locationSubCounty\` varchar(255) NULL, \`locationWard\` varchar(255) NULL, \`chamaaId\` varchar(36) NULL, \`createdById\` varchar(36) NULL, UNIQUE INDEX \`REL_ba36bc6e1457e679639ff2f8de\` (\`chamaaId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chamaa_account_history\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`action\` varchar(255) NOT NULL, \`chamaaId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account_history\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`action\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, \`staffId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`chamaa\` DROP COLUMN \`createdById\``);
        await queryRunner.query(`ALTER TABLE \`chamaa\` DROP COLUMN \`locationCounty\``);
        await queryRunner.query(`ALTER TABLE \`chamaa\` DROP COLUMN \`locationSubCounty\``);
        await queryRunner.query(`ALTER TABLE \`chamaa\` DROP COLUMN \`locationWard\``);
        await queryRunner.query(`ALTER TABLE \`chamaa_profile\` ADD CONSTRAINT \`FK_ba36bc6e1457e679639ff2f8deb\` FOREIGN KEY (\`chamaaId\`) REFERENCES \`chamaa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chamaa_profile\` ADD CONSTRAINT \`FK_a6df6e0844b2c203db3953088eb\` FOREIGN KEY (\`createdById\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chamaa_account_history\` ADD CONSTRAINT \`FK_6426aee79da3e9cc243695ef2ef\` FOREIGN KEY (\`chamaaId\`) REFERENCES \`chamaa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chamaa_account_history\` ADD CONSTRAINT \`FK_c04bd4c62a8ebc888d33a0802de\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account_history\` ADD CONSTRAINT \`FK_09e26203e8228082b0e497cd882\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account_history\` ADD CONSTRAINT \`FK_f10ad24df5536f8d1fa34635262\` FOREIGN KEY (\`staffId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account_history\` DROP FOREIGN KEY \`FK_f10ad24df5536f8d1fa34635262\``);
        await queryRunner.query(`ALTER TABLE \`user_account_history\` DROP FOREIGN KEY \`FK_09e26203e8228082b0e497cd882\``);
        await queryRunner.query(`ALTER TABLE \`chamaa_account_history\` DROP FOREIGN KEY \`FK_c04bd4c62a8ebc888d33a0802de\``);
        await queryRunner.query(`ALTER TABLE \`chamaa_account_history\` DROP FOREIGN KEY \`FK_6426aee79da3e9cc243695ef2ef\``);
        await queryRunner.query(`ALTER TABLE \`chamaa_profile\` DROP FOREIGN KEY \`FK_a6df6e0844b2c203db3953088eb\``);
        await queryRunner.query(`ALTER TABLE \`chamaa_profile\` DROP FOREIGN KEY \`FK_ba36bc6e1457e679639ff2f8deb\``);
        await queryRunner.query(`ALTER TABLE \`chamaa\` ADD \`locationWard\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`chamaa\` ADD \`locationSubCounty\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`chamaa\` ADD \`locationCounty\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`chamaa\` ADD \`createdById\` varchar(36) NULL`);
        await queryRunner.query(`DROP TABLE \`user_account_history\``);
        await queryRunner.query(`DROP TABLE \`chamaa_account_history\``);
        await queryRunner.query(`DROP INDEX \`REL_ba36bc6e1457e679639ff2f8de\` ON \`chamaa_profile\``);
        await queryRunner.query(`DROP TABLE \`chamaa_profile\``);
        await queryRunner.query(`ALTER TABLE \`chamaa\` ADD CONSTRAINT \`FK_d677366c610943ed4ae5cfd2b87\` FOREIGN KEY (\`createdById\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
