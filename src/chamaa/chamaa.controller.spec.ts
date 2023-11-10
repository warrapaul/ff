import { Test, TestingModule } from '@nestjs/testing';
import { ChamaaController } from './chamaa.controller';
import { ChamaaService } from './chamaa.service';

describe('ChamaaController', () => {
  let controller: ChamaaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChamaaController],
      providers: [ChamaaService],
    }).compile();

    controller = module.get<ChamaaController>(ChamaaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
