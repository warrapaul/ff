import { Module } from '@nestjs/common';
import { PostSeedService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Post])],
  providers: [PostSeedService],
  exports:[PostSeedService]
})
export class PostModule {}
