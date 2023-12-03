import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { ChamaaService } from './chamaa.service';
import { CreateChamaaDto } from './dto/create-chamaa.dto';
import { UpdateChamaaDto } from './dto/update-chamaa.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { CreateMultipleOfficialPositionsDto, CreateOfficialPositionsDto } from './dto/official-positions.dto';

@Permissions('ViewChamaa')
@Controller('chamaa')
export class ChamaaController {
  constructor(private readonly chamaaService: ChamaaService) {}

  @Permissions('CreateChamaa')
  @Post()
  create(@Req() req, @Body() createChamaaDto: CreateChamaaDto) {
    return this.chamaaService.create(createChamaaDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.chamaaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chamaaService.findOne(id);
  }

  @Permissions('UpdateChamaa')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChamaaDto: UpdateChamaaDto) {
    return this.chamaaService.update(+id, updateChamaaDto);
  }


  @HttpCode(HttpStatus.OK)
  @Permissions('DeleteChamaa')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chamaaService.remove(id);
  }

  @Permissions('UpdateChamaa')
  @Post('officials/create-position')
  createOfficialPosition(@Req() req, @Body() createOfficialPositionsDto: CreateOfficialPositionsDto) {
    return this.chamaaService.createOfficialPosition(createOfficialPositionsDto, req.user.id);
  }

  @Permissions('UpdateChamaa')
  @Post('officials/create-positions')
  createOfficialPositions(@Req() req, @Body() createMultipleOfficialPositionsDto: CreateMultipleOfficialPositionsDto) {
    return this.chamaaService.createOfficialPositions(createMultipleOfficialPositionsDto, req.user.id);
  }
}
