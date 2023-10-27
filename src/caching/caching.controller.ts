import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CachingService } from './caching.service';
import { CreateCachingDto } from './dto/create-caching.dto';
import { UpdateCachingDto } from './dto/update-caching.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('caching')
@ApiTags('Caching')
export class CachingController {
  constructor(private readonly cachingService: CachingService) {}

  @Post()
  create(@Body() createCachingDto: CreateCachingDto) {
    return this.cachingService.create(createCachingDto);
  }

  @Get()
  findAll() {
    return this.cachingService.findAll();
  }

  @Get('nocaching')
  findAllNoCaching() {
    return this.cachingService.findAllNoCaching()
  }

  @Get('nestcache')
  findAllNestCache() {
    return this.cachingService.findAllNestCache()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cachingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCachingDto: UpdateCachingDto) {
    return this.cachingService.update(+id, updateCachingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cachingService.remove(+id);
  }
}
