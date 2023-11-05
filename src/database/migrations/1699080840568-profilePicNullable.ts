import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfilePicNullable1699080840568 implements MigrationInterface {
    name = 'ProfilePicNullable1699080840568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profilePic\` \`profilePic\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profilePic\` \`profilePic\` varchar(255) NOT NULL`);
    }

}
