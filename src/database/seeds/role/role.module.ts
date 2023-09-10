import { Module } from '@nestjs/common';
import { RoleSeedService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role]), RoleModule],
  providers: [RoleSeedService],
  exports:[RoleSeedService]
})
export class RoleModule {}
