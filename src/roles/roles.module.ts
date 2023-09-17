import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { UserModule } from 'src/database/seeds/user/user.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Role,Permission,User]),
  
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
