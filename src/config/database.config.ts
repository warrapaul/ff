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
  migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
}));




// import * as dotenv from 'dotenv';
// import { cwd, env } from 'process';
// import { DataSource } from 'typeorm';

// dotenv.config();

// export const dataSource = new DataSource({
//   type: 'postgres',
//   host: env.TYPEORM_HOST,
//   port: parseInt(env.TYPEORM_PORT),
//   username: env.TYPEORM_USER,
//   password: env.TYPEORM_PASSWORD,
//   database: env.TYPEORM_DB,
//   entities: [cwd() + '/src/**/*.entity.ts'],
//   migrations: [cwd() + '/src/migrations/*.ts'],
//   migrationsTableName: 'migrations',
//   synchronize: false,
//   dropSchema: false,
// });

// scripts={
//     "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli -d ./src/config/ormconfig.ts",
// "migration:create": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli migration:create ./src/migrations/$npm_config_name",
// "migration:generate": "npm run typeorm -- migration:generate ./src/migrations/$npm_config_name",
// "migration:run": "npm run typeorm -- migration:run",
// "migration:revert": "npm run typeorm -- migration:revert",
// "schema:sync": "npm run typeorm -- schema:sync"
// }
// npm run migration:create --name=foo
// npm run migration:generate --name=bar










// scripts={
// "typeorm": "npm run build && npx typeorm -d dist/db/data-source.js",
// "migration:generate": "npm run typeorm -- migration:generate",
// "migration:run": "npm run typeorm -- migration:run",
// "migration:revert": "npm run typeorm -- migration:revert"
// }


// import { DataSource, DataSourceOptions } from "typeorm";

// export const dataSourceOptions: DataSourceOptions={
// type: 'mysql',
// host: process.env.DATABASE_HOST,
// port: parseInt(process.env.DATABASE_PORT),
// username: process.env.DATABASE_USERNAME,
// password: 'tttt',
// database: 'uuuu',
// synchronize: false,
// logging: Boolean(process.env.DATABASE_LOGGING),
// entities: ['dist/**/*.entity.js'],
// migrations: ['dist/db/migrations/*.js']
// }

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;

// TypeOrmModule.forRoot(dataSourceOptions),

// npm run migration:generate -- src/db/migrations/initial
// npm run migration:run
// npm run migration:revert