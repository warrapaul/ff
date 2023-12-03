import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from 'src/utils/utils.module';
import { UserAccount } from './entities/user-account.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserAccountHistory } from './entities/user-account-history.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,UserAccount,UserProfile,UserAccountHistory]),
    HttpModule,
    UtilsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
