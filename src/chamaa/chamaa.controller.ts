import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChamaaService } from './chamaa.service';
import { CreateChamaaDto } from './dto/create-chamaa.dto';
import { UpdateChamaaDto } from './dto/update-chamaa.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Permissions('ViewChamaa')
@Controller('chamaa')
export class ChamaaController {
  constructor(private readonly chamaaService: ChamaaService) {}

  @Permissions('CreateChamaa')
  @Post()
  create(@Body() createChamaaDto: CreateChamaaDto) {
    return this.chamaaService.create(createChamaaDto);
  }

  @Get()
  findAll() {
    return this.chamaaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chamaaService.findOne(+id);
  }

  @Permissions('UpdateChamaa')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChamaaDto: UpdateChamaaDto) {
    return this.chamaaService.update(+id, updateChamaaDto);
  }


  @Permissions('DeleteChamaa')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chamaaService.remove(+id);
  }
}