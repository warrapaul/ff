import { MigrationInterface, QueryRunner } from "typeorm";

export class Addedchamaa1701178903998 implements MigrationInterface {
    name = 'Addedchamaa1701178903998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`authorId\` \`deletedAt\` varchar(36) NULL`);
        await queryRunner.query(`CREATE TABLE \`user_profile\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`gender\` varchar(255) NOT NULL, \`dob\` datetime NOT NULL, \`phoneNumberSecondary\` varchar(255) NULL, \`idPicFront\` varchar(255) NULL, \`idPicBack\` varchar(255) NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`REL_51cb79b5555effaf7d69ba1cff\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`accountNumber\` int NOT NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_7af0238bc057893ff6c45fe7c7\` (\`accountNumber\`), UNIQUE INDEX \`REL_08023c572a6a0a22798c56d6c1\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account_summary\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`dob\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`idPicBack\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`idPicFront\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phoneNumberSecondary\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`hashRt\` \`hashRt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_51cb79b5555effaf7d69ba1cff9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD CONSTRAINT \`FK_08023c572a6a0a22798c56d6c17\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP FOREIGN KEY \`FK_08023c572a6a0a22798c56d6c17\``);
        await queryRunner.query(`ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_51cb79b5555effaf7d69ba1cff9\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`deletedAt\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`hashRt\` \`hashRt\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phoneNumberSecondary\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`idPicFront\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`idPicBack\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`dob\` datetime NOT NULL`);
        await queryRunner.query(`DROP TABLE \`user_account_summary\``);
        await queryRunner.query(`DROP INDEX \`REL_08023c572a6a0a22798c56d6c1\` ON \`user_account\``);
        await queryRunner.query(`DROP INDEX \`IDX_7af0238bc057893ff6c45fe7c7\` ON \`user_account\``);
        await queryRunner.query(`DROP TABLE \`user_account\``);
        await queryRunner.query(`DROP INDEX \`REL_51cb79b5555effaf7d69ba1cff\` ON \`user_profile\``);
        await queryRunner.query(`DROP TABLE \`user_profile\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`deletedAt\` \`authorId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
