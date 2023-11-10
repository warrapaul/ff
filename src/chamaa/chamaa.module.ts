import { Module } from '@nestjs/common';
import { ChamaaService } from './chamaa.service';
import { ChamaaController } from './chamaa.controller';

@Module({
  controllers: [ChamaaController],
  providers: [ChamaaService],
})
export class ChamaaModule {}
