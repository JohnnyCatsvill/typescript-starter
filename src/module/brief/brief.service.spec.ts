import { Test, TestingModule } from '@nestjs/testing';
import { BriefService } from './brief.service';

describe('BriefService', () => {
  let service: BriefService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BriefService],
    }).compile();

    service = module.get<BriefService>(BriefService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
