import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedtableTransaction1704364548072 implements MigrationInterface {
    name = 'UpdatedtableTransaction1704364548072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`RENAME TABLE \`transaction\` TO \`transaction_tbl\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`RENAME TABLE \`transaction_tbl\` TO \`transaction\``);
    }

}
