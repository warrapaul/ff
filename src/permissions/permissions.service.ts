import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository:Repository<Permission>,

  ){

  }
  async create(createPermissionDto: CreatePermissionDto) {
    return await this.permissionRepository.save(
      this.permissionRepository.create(createPermissionDto)
    )
  }

  async findAll() {
    return await this.permissionRepository.find()
  }

  async findOne(id: string) {
    return await this.permissionRepository.findOne({where:{id}})
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: string) {
    return `This action removes a #${id} permission`;
  }

  // async findPermissionsByIds(permissionIds: string[]): Promise<Permission[]>{
  //   return await this.permissionRepository.find({
  //     where:{
  //       id:{wherein:permissionIds}
  //     }
  //   })
  // }
}
