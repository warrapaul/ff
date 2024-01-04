import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedtransactionReferencee1704364893522 implements MigrationInterface {
    name = 'UpdatedtransactionReferencee1704364893522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction_tbl\` DROP FOREIGN KEY \`FK_38e96bca2c27b53408857753407\``);
        await queryRunner.query(`ALTER TABLE \`transaction_tbl\` DROP FOREIGN KEY \`FK_605baeb040ff0fae995404cea37\``);
        await queryRunner.query(`ALTER TABLE \`transaction_tbl\` ADD CONSTRAINT \`FK_6ff89151fc200487352082acf9c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction_tbl\` ADD CONSTRAINT \`FK_835f3c2bc818840ff615e9fab7d\` FOREIGN KEY (\`chamaaId\`) REFERENCES \`chamaa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction_tbl\` DROP FOREIGN KEY \`FK_835f3c2bc818840ff615e9fab7d\``);
        await queryRunner.query(`ALTER TABLE \`transaction_tbl\` DROP FOREIGN KEY \`FK_6ff89151fc200487352082acf9c\``);
        await queryRunner.query(`ALTER TABLE \`transaction_tbl\` ADD CONSTRAINT \`FK_605baeb040ff0fae995404cea37\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction_tbl\` ADD CONSTRAINT \`FK_38e96bca2c27b53408857753407\` FOREIGN KEY (\`chamaaId\`) REFERENCES \`chamaa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
