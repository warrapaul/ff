// import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
// import { config } from 'dotenv';

// config();

// const configService = new ConfigService();

// export default new DataSource({
//   type: 'mysql',
//   host: configService.get('DB_HOST'),
//   port: configService.get('DB_PORT'),
//   username: configService.get('DB_USER'),
//   password: configService.get('DB_PASSWORD'),
//   database: configService.get('DB_NAME'),
//   synchronize: configService.get('nodenv') === 'development',
//   logging: configService.get('nodenv') === 'development',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
//   migrationsTableName: 'migrations',
// });
