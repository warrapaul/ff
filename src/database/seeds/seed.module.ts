import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
 ConfigModule.forRoot({
    envFilePath: ['.env'], 
    isGlobal: true,
    cache: true,
    load: [
      AppConfig,
      DatabaseConfig
      ],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      ...configService.get('database'),
    }),
    inject: [ConfigService],
  }),
  PostModule, 
  RoleModule, UserModule]
})
export class SeedModule {}
