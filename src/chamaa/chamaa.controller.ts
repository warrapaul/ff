import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { ChamaaService } from './chamaa.service';
import { CreateChamaaDto } from './dto/create-chamaa.dto';
import { UpdateChamaaDto, UpdateChamaaProfile } from './dto/update-chamaa.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import {  CreateOfficialPositionsDto, UpdateOfficialPositionDto } from './dto/official-positions.dto';
import { CreateMultipleOfficialPositionsDto, UpdateMultipleOfficialPositionsDto } from './dto/official-positions-multiple.dto';

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
  @Patch('update-profile')
  updateChamaaProfile(@Body() updateChamaaProfile: UpdateChamaaProfile) {
    return this.chamaaService.updateChamaaProfile(updateChamaaProfile);
  }

  @Permissions('UpdateChamaa')
  @Patch(':id')
  updateChamaa(@Param('id') id: string, @Body() updateChamaaDto: UpdateChamaaDto) {
    return this.chamaaService.updateChamaa(id, updateChamaaDto);
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
    return this.chamaaService.createMultipleOfficialPositions(createMultipleOfficialPositionsDto, req.user.id);
  }
  
  @Permissions('UpdateChamaa')
  @Patch('officials/update-position/:positionId')
  updateOfficialPosition(@Param('positionId') positionId: string,@Req() req, @Body() updateOfficialPositionDto: UpdateOfficialPositionDto){
    return this.chamaaService.updateOfficialPosition(positionId, updateOfficialPositionDto, req.user.id)
  }

  @Permissions('UpdateChamaa')
  @Patch('officials/update-positions')
  updateMultipleOfficialPositions(@Req() req, @Body() updateMultipleOfficialPositionsDto: UpdateMultipleOfficialPositionsDto){
    return this.chamaaService.updateMultipleOfficialPositions(updateMultipleOfficialPositionsDto, req.user.id)
  }

}
