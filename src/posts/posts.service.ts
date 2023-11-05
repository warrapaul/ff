import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ArrayContains, Between, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, Not, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { title } from 'process';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { HttpService } from '@nestjs/axios';
import { ApiCallDto } from './dto/api-call.dto';
import { catchError, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { response } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { NOTIFY_SUBSCRIBED_CUSTOMERS } from 'src/common/constants/posts.constants';
import { Queue } from 'bull';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name)
  constructor(
    @InjectRepository(Post)
    private postRepository:Repository<Post>,
    private readonly config: ConfigService,
    private eventEmitter: EventEmitter2,
    private readonly httpService:HttpService,
    @InjectQueue(NOTIFY_SUBSCRIBED_CUSTOMERS)
    private notifySubscribers: Queue,
  ){}
  async create(createPostDto: CreatePostDto, user:User) {

    this.logger.error('**********logging error');
    this.logger.verbose('**************logging verbose');
    this.logger.log('************normal logger');
    const currPost = this.postRepository.create({...createPostDto, author:user});
    const createdPost= await this.postRepository.save(currPost);

    //emit event
    this.eventEmitter.emit('post.created', createdPost)


     //notify subscribed users
    try {
      await this.notifySubscribers.add('persist-otp-queue', createPostDto, {});
      this.logger.debug('New post notification queue successfully')
    } catch (error) {
      throw new HttpException('Error adding new post notification to the queue', HttpStatus.INTERNAL_SERVER_ERROR)
    }


   


    return createdPost;
  }
  
  async search(keyword:string){
    return await this.postRepository.find({
      select:{
        id:true,
        title:true,
        description:true
      },
      relations:{
        author:true
      },
      where:[
        { title: Like(`%${keyword}%`) },
        {description: Like(`%${keyword}%`)}
      ],
      
    })
    
  }

  async findAll(){
    return await this.postRepository.find({
      relations:{
        author:true
      }
    })
    // return await this.postRepository
    //   .createQueryBuilder('post') //querybuilder build sql queries, post is alias of Post Entity
    //   .where('post.id = :postId', { postId: 2 }) 
    //   .getOne();

    // return await this.postRepository.findBy({
    //   // title:Not("second article"), // not comparision
    //   // id:LessThan(5),  //MoreThan()   MoreThanOrEqual()
    //   // id:LessThanOrEqual(5),
    //   // id:Between(2,4),
    //   // title:Like('%second%'), //ILike() //In(['a','b'])  //Any((['a','b']))
    //   // id:Not(MoreThan(2)) //combining options
    //   // status:IsNull(),
    // })
    // return await this.postRepository.find({
    //   select:{//columns to return
    //     id:true,
    //     title: true, 
    //     status:true
    //   },
    //   relations:{ //relations to include with main entity
    //     author:true
    //   },
    //   where:{
    //     status:"published",//filter main entity

    //     // author:{ //query embedded entity with respect to heiarchy it was defined
    //     //    email:"oeo@dsczvf.osdf",
    //     //    name:"psaul"
    //     // }
    //     author:[ //wrap with [] to query with the OR operator
    //       {email:"oeo@dsczvf.osdf"},
    //       {email:"test@test.com"}
    //     ]
    //   }, 
    //   order:{ //order the selection
    //     id:"DESC",
    //     title:"ASC"
    //   },
    //   // withDeleted:true,  // include entities deleted with soft delete
    //   skip: 5, //offset paginate
    //   take: 10, //limit for paginate - ensure order is set when paginating
    // })
    // return await this.postRepository.find()

  }

  async findOne(id: string) {
    return await this.postRepository.findOneBy({id})
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }



  async getApiCalls(): Promise<ApiCallDto[]>{  
   try{
          const url = 'https://jsonplaceholder.typicode.com/comments';
          const  data = await lastValueFrom(
            this.httpService.get(url).pipe(
              map(response =>{
                console.log({response})
                return response.data
              }),
              catchError(error => {
                console.error('Error in API get calls', error);
                throw new HttpException('Error in API get calls', HttpStatus.INTERNAL_SERVER_ERROR)
              })
            )
          )
          return data
     }catch(error){
      console.error('An error occurred:', error);
      throw new HttpException('Error in API get calls', HttpStatus.INTERNAL_SERVER_ERROR)

     }
  }

  async postApiCalls(){
    try{
          const requestConfig ={
              headers:{
                'Content-Type': 'application/json'
              },
              // params:{
              //   param1:'something'
              // }
            }

            const data = JSON.stringify({
              title: 'foo',
              body: 'bar',
              userId: 1,
            })

            const url = 'https://jsonplaceholder.typicode.com/posts'
            const responseData = await lastValueFrom(
              this.httpService.post(url, data, requestConfig).pipe(
                map(response => {
                  return response.data
                }),
                catchError(error => {
                  console.error('Error in Post API calls', error);
                  throw new HttpException('Error in Post API calls', HttpStatus.INTERNAL_SERVER_ERROR)
                })
              )
            )   
            return responseData;       
          
    }catch(error){
      console.error('An error occurred:', error);
      throw new HttpException('Error in post API calls', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }





}
