import { Module } from '@nestjs/common';
import { CachingService } from './caching.service';
import { CachingController } from './caching.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports:[
    HttpModule, 
    CacheModule.register({
      isGlobal:true,
  })],
  controllers: [CachingController],
  providers: [CachingService],
})
export class CachingModule {}
