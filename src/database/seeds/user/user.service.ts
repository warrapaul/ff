import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';
import { UserAccStatusEnum } from 'src/users/enums';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        // private readonly rolesService: RolesService
        
        ){}

    async run(){
        const countUser = await this.userRepository.count()

        if(!countUser){
            // this.userRepository.save(
            //     this.userRepository.create({
            //         name: 'paul',
            //         email: 'wara@paul.com',
            //         phoneNumber: '708841142',
            //         status: UserAccStatusEnum.ACTIVE,
            //         password: 'string',
            //         hash: 'string',
            //         hashRt: 'string',
            //         role:await this.rolesService.findOne('1')
            //     })
            // )
        }
    }
}
