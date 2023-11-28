import { Module } from '@nestjs/common';
import { ChamaaService } from './chamaa.service';
import { ChamaaController } from './chamaa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChamaaOfficial } from './entities/chamaa-officials.entity';
import { Chamaa } from './entities/chamaa.entity';
import { ChamaaAccountHistory } from './entities/chamaa-account-history.entity';
import { ChamaaProfile } from './entities/chamaa-profile.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Chamaa,ChamaaProfile,ChamaaOfficial, ChamaaAccountHistory])
  ],
  controllers: [ChamaaController],
  providers: [ChamaaService],
})
export class ChamaaModule {}
