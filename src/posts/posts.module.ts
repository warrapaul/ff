import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostCreatedListener } from './listeners/post-created.listener';

@Module({
  imports:[TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService,PostCreatedListener],
})
export class PostsModule {}
