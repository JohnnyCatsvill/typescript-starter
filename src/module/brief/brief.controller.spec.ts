import { Test, TestingModule } from '@nestjs/testing';
import { BriefController } from './brief.controller';
import { BriefService } from './brief.service';

describe('BriefController', () => {
  let controller: BriefController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BriefController],
      providers: [BriefService],
    }).compile();

    controller = module.get<BriefController>(BriefController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
