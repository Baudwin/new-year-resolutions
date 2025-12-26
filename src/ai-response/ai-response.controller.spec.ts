import { Test, TestingModule } from '@nestjs/testing';
import { AiResponseController } from './ai-response.controller';
import { AiResponseService } from './ai-response.service';

describe('AiResponseController', () => {
  let controller: AiResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiResponseController],
      providers: [AiResponseService],
    }).compile();

    controller = module.get<AiResponseController>(AiResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
