import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
    constructor(
    @InjectRepository(Role)
    private roleRepository:Repository<Role>
    ){}

    async run(){
        const countRoles= await this.roleRepository.count({
            where:{
                name: 'Admin',
                description:'descccc',
                isActive:true
            }
        })
    }
}
