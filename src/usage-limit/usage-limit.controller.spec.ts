import { Test, TestingModule } from '@nestjs/testing';
import { UsageLimitController } from './usage-limit.controller';
import { UsageLimitService } from './usage-limit.service';

describe('UsageLimitController', () => {
  let controller: UsageLimitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsageLimitController],
      providers: [UsageLimitService],
    }).compile();

    controller = module.get<UsageLimitController>(UsageLimitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
