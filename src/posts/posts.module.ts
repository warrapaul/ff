import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostCreatedListener } from './listeners/post-created.listener';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { NOTIFY_SUBSCRIBED_CUSTOMERS } from 'src/common/constants/posts.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([Post]),
    HttpModule,
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
    
    BullModule.registerQueue({
      name: NOTIFY_SUBSCRIBED_CUSTOMERS
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService,PostCreatedListener],
})
export class PostsModule {}
