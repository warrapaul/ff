import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { Newsv1Controller } from './newsv1.controller';
import { NewsArticlesController } from './news-articles.controller';

@Module({
  controllers: [NewsController, Newsv1Controller, NewsArticlesController ],
  providers: [NewsService],
})
export class NewsModule {}
