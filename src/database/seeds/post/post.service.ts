import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { PostStatusEnum } from 'src/posts/enums';
import { Repository } from 'typeorm';

@Injectable()
export class PostSeedService {
    constructor(
        @InjectRepository(Post)
        private postRepository:Repository<Post>
    ){}

    async run(){
        const countPost = await this.postRepository.count({
            where:{
                status:PostStatusEnum.PUBLISHED
            }
        })

        if(!countPost){
            // await this.postRepository.save(
            //     this.postRepository.create({
            //         title: string;
            //         statusPoststatusEnum
            //         category:PostCategoryEnum[]
            //         description: string;
            //         author:User
            //     })
            // )
        }
    }
}
