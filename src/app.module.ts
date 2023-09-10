import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards';
import { AppConfig, DatabaseConfig } from './config';
import { PostsModule } from './posts/posts.module';
import { PermissionsModule } from './permissions/permissions.module';
import { SeedModule } from './database/seeds/seed.module';

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
    
    AuthModule,
    UsersModule,
    RolesModule,
    PostsModule,
    PermissionsModule,
    SeedModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {
  
}
