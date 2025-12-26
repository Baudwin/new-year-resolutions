import { Test, TestingModule } from '@nestjs/testing';
import { UsageLimitService } from './usage-limit.service';

describe('UsageLimitService', () => {
  let service: UsageLimitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsageLimitService],
    }).compile();

    service = module.get<UsageLimitService>(UsageLimitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
