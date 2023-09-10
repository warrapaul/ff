import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ArrayContains, Between, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, Not, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository:Repository<Post>
  ){}
  async create(createPostDto: CreatePostDto, user:User) {
    const currPost = this.postRepository.create({...createPostDto, author:user});
    return await this.postRepository.save(currPost);
  }

  async findAll() {


    return await this.postRepository
      .createQueryBuilder('post') //querybuilder build sql queries, post is alias of Post Entity
      .where('post.id = :postId', { postId: 2 }) 
      .getOne();

    return await this.postRepository.findBy({
      // title:Not("second article"), // not comparision
      // id:LessThan(5),  //MoreThan()   MoreThanOrEqual()
      // id:LessThanOrEqual(5),
      // id:Between(2,4),
      // title:Like('%second%'), //ILike() //In(['a','b'])  //Any((['a','b']))
      // id:Not(MoreThan(2)) //combining options
      // status:IsNull(),
    })
    return await this.postRepository.find({
      select:{//columns to return
        id:true,
        title: true, 
        status:true
      },
      relations:{ //relations to include with main entity
        author:true
      },
      where:{
        status:"published",//filter main entity

        // author:{ //query embedded entity with respect to heiarchy it was defined
        //    email:"oeo@dsczvf.osdf",
        //    name:"psaul"
        // }
        author:[ //wrap with [] to query with the OR operator
          {email:"oeo@dsczvf.osdf"},
          {email:"test@test.com"}
        ]
      }, 
      order:{ //order the selection
        id:"DESC",
        title:"ASC"
      },
      // withDeleted:true,  // include entities deleted with soft delete
      skip: 5, //offset paginate
      take: 10, //limit for paginate - ensure order is set when paginating
    })
    return await this.postRepository.find()

  }

  findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
