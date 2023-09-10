import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor (
    @InjectRepository(Role)
    private rolesRepository:Repository<Role>

  ){}

  async create(createRoleDto: CreateRoleDto): Promise<Role | undefined> {
    // const roleName= this.rolesRepository.findOne({where:{name:createRoleDto.name}})
    // if(roleName) throw new HttpException(`role ${createRoleDto.name} already exists`, HttpStatus.BAD_REQUEST)

    const currRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(currRole);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    return await this.rolesRepository.findOne({where:{id}});
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
}
