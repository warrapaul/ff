import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedOfficials1701180818633 implements MigrationInterface {
    name = 'AddedOfficials1701180818633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`chamaa\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`registrationNumber\` varchar(255) NULL, \`locationCounty\` varchar(255) NULL, \`locationSubCounty\` varchar(255) NULL, \`locationWard\` varchar(255) NULL, \`status\` enum ('pending_approval', 'active', 'disabled', 'closed') NOT NULL DEFAULT 'pending_approval', \`createdById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chamaa_official\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`position\` varchar(255) NOT NULL, \`roleDescription\` varchar(255) NOT NULL, \`chamaaId\` varchar(36) NULL, \`userAccountId\` varchar(36) NULL, UNIQUE INDEX \`IDX_242a40a3b07266b86c2ab3e185\` (\`position\`, \`chamaaId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` ADD \`currentBalance\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` ADD \`chamaaId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`nationalId\` \`nationalId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chamaa\` ADD CONSTRAINT \`FK_d677366c610943ed4ae5cfd2b87\` FOREIGN KEY (\`createdById\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chamaa_official\` ADD CONSTRAINT \`FK_6f2f1bc444394a4161a9dbe6bf8\` FOREIGN KEY (\`chamaaId\`) REFERENCES \`chamaa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chamaa_official\` ADD CONSTRAINT \`FK_328802115fa0155fdce99339216\` FOREIGN KEY (\`userAccountId\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` ADD CONSTRAINT \`FK_c3991bac0c4cdfac194f964200a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` ADD CONSTRAINT \`FK_f96bc31b06003ed2f0528d2f635\` FOREIGN KEY (\`chamaaId\`) REFERENCES \`chamaa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` DROP FOREIGN KEY \`FK_f96bc31b06003ed2f0528d2f635\``);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` DROP FOREIGN KEY \`FK_c3991bac0c4cdfac194f964200a\``);
        await queryRunner.query(`ALTER TABLE \`chamaa_official\` DROP FOREIGN KEY \`FK_328802115fa0155fdce99339216\``);
        await queryRunner.query(`ALTER TABLE \`chamaa_official\` DROP FOREIGN KEY \`FK_6f2f1bc444394a4161a9dbe6bf8\``);
        await queryRunner.query(`ALTER TABLE \`chamaa\` DROP FOREIGN KEY \`FK_d677366c610943ed4ae5cfd2b87\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`nationalId\` \`nationalId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` DROP COLUMN \`chamaaId\``);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user_account_summary\` DROP COLUMN \`currentBalance\``);
        await queryRunner.query(`DROP INDEX \`IDX_242a40a3b07266b86c2ab3e185\` ON \`chamaa_official\``);
        await queryRunner.query(`DROP TABLE \`chamaa_official\``);
        await queryRunner.query(`DROP TABLE \`chamaa\``);
    }

}
