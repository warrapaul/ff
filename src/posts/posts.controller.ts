import { Controller, Get, Body, Post, Patch, Param, Delete, ParseIntPipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { User } from 'src/users/entities/user.entity';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Post as SocialPost } from './entities/post.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @GetCurrentUser() user:User) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery):Promise<Paginated<SocialPost>> {
    return this.postsService.findAll(query);
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
}
