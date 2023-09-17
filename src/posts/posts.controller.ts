import { Controller, Get, Body, Post, Patch, Param, Delete, ParseIntPipe, ParseUUIDPipe, Query, SetMetadata } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { User } from 'src/users/entities/user.entity';
import { FilterOperator, FilterSuffix, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Post as SocialPost } from './entities/post.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@ApiTags('Posts')
@ApiBearerAuth()
@Permissions('ReadPost')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @GetCurrentUser() user:User) {
    return this.postsService.create(createPostDto, user);
  }

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
}
