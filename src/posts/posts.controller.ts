import { Controller, Get, Body, Post, Patch, Param, Delete, ParseIntPipe, ParseUUIDPipe, Query, SetMetadata, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { User } from 'src/users/entities/user.entity';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Post as SocialPost } from './entities/post.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadImgToFolderHelper } from 'src/common/helpers/image-upload.helper';

@ApiTags('Posts')
@ApiBearerAuth()
// @Permissions('ReadPost')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('mainImage',UploadImgToFolderHelper))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() mainImage: Express.Multer.File,
    @GetCurrentUser() user:User) {
      
    return this.postsService.create(createPostDto, user);
    // return {
    //   createPostDto,
    //   mainImage
    // }
  }


  // @Post()
  // @UseInterceptors(FileInterceptor('mainImage'))
  // create(
  //   @Body() createPostDto: CreatePostDto,
  //   @UploadedFile( new ParseFilePipe({
  //     validators: [
  //       new MaxFileSizeValidator({maxSize:1000}),
  //       new FileTypeValidator({fileType:'image/jpeg' |'image/jpeg'})
  //     ]
  //   })) mainImage: Express.Multer.File,
  //   @GetCurrentUser() user:User) {
      
  //   // return this.postsService.create(createPostDto, user);
  //   return {
  //     createPostDto,
  //     mainImage
  //   }
  // }


  @Permissions('DeletePost')
  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  @Get('search')
  search(@Query() s: string){
    return this.postsService.search(s);
  }


  @Get(':id') 
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }


  @Get('api-calls/list')
  getApicalls(){
    return this.postsService.getApiCalls();
  }

  @Post('api-calls/create')
  postApicalls(){
    return this.postsService.postApiCalls();
  }
 

  
}
