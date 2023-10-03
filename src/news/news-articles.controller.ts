import { Controller, Get, Version } from '@nestjs/common';

@Controller('news-articles')
export class NewsArticlesController {
  @Version('1')
  @Get()
  findAll() {
    return {
        message:'from v1'
    }
  }

  @Version('2')
  @Get()
  findAllV2() {
    return {
        message:'from v2'
    }
  }

}
