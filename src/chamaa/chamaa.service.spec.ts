import { Test, TestingModule } from '@nestjs/testing';
import { ChamaaService } from './chamaa.service';

describe('ChamaaService', () => {
  let service: ChamaaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChamaaService],
    }).compile();

    service = module.get<ChamaaService>(ChamaaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
