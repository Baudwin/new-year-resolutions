import { Test, TestingModule } from '@nestjs/testing';
import { AiResponseService } from './ai-response.service';

describe('AiResponseService', () => {
  let service: AiResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiResponseService],
    }).compile();

    service = module.get<AiResponseService>(AiResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
