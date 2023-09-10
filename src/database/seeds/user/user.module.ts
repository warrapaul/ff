import { Module } from '@nestjs/common';
import { UserSeedService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]), RoleModule],
  providers: [UserSeedService],
  exports:[UserSeedService]
})
export class UserModule {}
