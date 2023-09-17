import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssignPermissionsToRoleDto } from './dto/assign-permissions-to-role.dto';
import { AssignUserRoleDto } from './dto/assing-user-role.dto';

@ApiTags('Roles and Permissions')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }


  @Post('assign-permissions')
  async assignPermissionsToRole(@Body() assignPermissionsToRoleDto:AssignPermissionsToRoleDto){
    await this.rolesService.assignPermissionsToRole(assignPermissionsToRoleDto);
    return { message: 'Permissions assigned successfully' };
  }

  @Post('assign-user-role')
  async assignUserRole(@Body() assignUserRoleDto:AssignUserRoleDto){
    await this.rolesService.assignUserRole(assignUserRoleDto);
    return { message: 'Role assigned successfully' };
  }

}
