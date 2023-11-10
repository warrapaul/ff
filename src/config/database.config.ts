import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    //npm run migration:generate --name=initial
    //npm run migration:run
    //npm run typeorm migration:generate --name create-users
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    migrations: [`${__dirname}/../../database/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
  }));
  






  //npm run migration:generate --name=initial
    //npm run migration:run

    //create migration
    //npm run migration:create --name=idToNumber 

    

//example created
//migration to update column from varchar to int
// import { MigrationInterface, QueryRunner } from "typeorm";

// export class IdToNumber1699606580185 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         // Convert existing varchar data to int
//         await queryRunner.query(`UPDATE \`user\` SET \`nationalId\` = CAST(\`nationalId\` AS SIGNED)`);
        
//         // Alter the column type
//         await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`nationalId\` int`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         // Convert existing int data to varchar
//         await queryRunner.query(`UPDATE \`user\` SET \`nationalId\` = CAST(\`nationalId\` AS CHAR(255))`);

//         // Revert the column type
//         await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`nationalId\` varchar(255)`);
//     }
// }
