import { MigrationInterface, QueryRunner } from "typeorm";

export class IdToNumber1699606580185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Convert existing varchar data to int
        await queryRunner.query(`UPDATE \`user\` SET \`nationalId\` = CAST(\`nationalId\` AS SIGNED)`);
        
        // Alter the column type
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`nationalId\` int`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Convert existing int data to varchar
        await queryRunner.query(`UPDATE \`user\` SET \`nationalId\` = CAST(\`nationalId\` AS CHAR(255))`);

        // Revert the column type
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`nationalId\` varchar(255)`);
    }
}
