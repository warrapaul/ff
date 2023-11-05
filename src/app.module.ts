import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CachingModule } from './caching/caching.module';
import { MulterModule } from '@nestjs/platform-express';
import { NewsModule } from './news/news.module';
import { MessagesModule } from './messages/messages.module';
import { WsAuthMiddleware } from './common/middlewares/ws-auth.middleware';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { NOTIFY_SUBSCRIBED_CUSTOMERS } from './common/constants/posts.constants';
import { UtilsModule } from './utils/utils.module';

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
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),

    
    MulterModule.register({}),
    
    AuthModule,
    UsersModule,
    RolesModule,
    PostsModule,
    PermissionsModule,
    SeedModule,
    CachingModule,
    NewsModule,
    MessagesModule,
    UtilsModule
    ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide:APP_GUARD,
      useClass:PermissionsGuard
    }
  ],
})
export class AppModule {}
