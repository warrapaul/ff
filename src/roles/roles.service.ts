import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignPermissionsToRoleDto } from './dto/assign-permissions-to-role.dto';
import { Permission } from 'src/permissions/entities/permission.entity';
import { AssignUserRoleDto } from './dto/assing-user-role.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesService {
  constructor (
    @InjectRepository(Role)
    private rolesRepository:Repository<Role>,
    @InjectRepository(Permission) 
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
  ){}

  async create(createRoleDto: CreateRoleDto): Promise<Role | undefined> {
    // const roleName= this.rolesRepository.findOne({where:{name:createRoleDto.name}})
    // if(roleName) throw new HttpException(`role ${createRoleDto.name} already exists`, HttpStatus.BAD_REQUEST)

    const currRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(currRole);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find({relations:{permissions:true}});
  }

  async findOne(id: string): Promise<Role> {
    return await this.rolesRepository.findOne({
      where:{id},
      relations:{
        permissions:true
      }
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | undefined> {
    const currRole = await this.rolesRepository.findOneBy({id})
    if(!currRole) throw new HttpException('Role not found', HttpStatus.BAD_REQUEST);

    //  return await this.rolesRepository.update(id, {updateRoleDto});
    return await this.rolesRepository.save(currRole)
  }

  remove(id: string) {
    return true;
  }
  async assignPermissionsToRole(assignPermissionsToRoleDto:AssignPermissionsToRoleDto){
    const {roleId, permissionIds} =assignPermissionsToRoleDto;
    const role = await this.rolesRepository.findOne({ where: { id: roleId } });

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.BAD_REQUEST);
    }

    const permissionIdsArray = await Promise.all(
      permissionIds.map((permissionId) => this.permissionRepository.findOne({ where: { id: permissionId } }))
    );

    role.permissions = permissionIdsArray;
    await this.rolesRepository.save(role)

  }

  async assignUserRole(assignUserRoleDto:AssignUserRoleDto){
    const user = await this.userRepository.findOne({where:{id:assignUserRoleDto.userId}});
    if(!user){
      throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
    }

    const role= await this.findOne(assignUserRoleDto.roleId);
    if(!role){
      throw new HttpException('Role not found',HttpStatus.BAD_REQUEST);
    }

    user.role = role;
    await this.userRepository.save(user);
  }

  async getPermissionNamesForUser(userId: string):Promise<string[]>{
    const user = await this.userRepository.findOne({
      where:{id:userId},
      relations:['role', 'role.permissions']
    });

    if(!user){
      throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
    }

    const role = user.role;
    if(!role){
      throw new HttpException('Role not found',HttpStatus.BAD_REQUEST);
    }

    if(!role.isActive){
      throw new HttpException('Role is inactive',HttpStatus.BAD_REQUEST);
    }

    const permissions = role.permissions;
    if(!permissions){
      // throw new HttpException('permissions not found',HttpStatus.BAD_REQUEST);
      return []
    }

    const permissionNames = permissions.map((permission) => permission.name);
    return permissionNames;
  }
}
