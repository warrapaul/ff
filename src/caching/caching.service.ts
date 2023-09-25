import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCachingDto } from './dto/create-caching.dto';
import { UpdateCachingDto } from './dto/update-caching.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  private readonly logger = new Logger(CachingService.name)

  constructor(
    private readonly httpService:HttpService,
    @Inject(CACHE_MANAGER)
    private cacheManger:Cache,
  ){}
  create(createCachingDto: CreateCachingDto) {
    return 'This action adds a new caching';
  }

  async findAllNoCaching() {
    try{
        const config ={
          // Headers:{ }
        }
        const responseData = await lastValueFrom(
          this.httpService.get('https://jsonplaceholder.typicode.com/photos', config).pipe(
            map((response)=>{
              return response.data
            }),
            catchError((error)=>{
              this.logger.error(error)
              throw new HttpException('Error fetcing photos', HttpStatus.INTERNAL_SERVER_ERROR)
            })
          )
        )
        await this.cacheManger.set('photos', responseData,2000); //0 - no expire
        return responseData;
      }catch(error){
        this.logger.error(error)
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  async findAllNestCache(){
    const cachedData = await this.cacheManger.get('photos')
    if(cachedData){
      return cachedData;
    }

    return this.findAllNoCaching();
  }


  findAll() {
    return `This action returns all caching`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caching`;
  }

  update(id: number, updateCachingDto: UpdateCachingDto) {
    return `This action updates a #${id} caching`;
  }

  remove(id: number) {
    return `This action removes a #${id} caching`;
  }
}
