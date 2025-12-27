import { Module } from '@nestjs/common';
import { AiResponseService } from './ai-response.service';
import { AiResponseController } from './ai-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiResponse } from './entities/ai-response.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AiResponse])],
  controllers: [AiResponseController],
  providers: [AiResponseService],
  exports:[AiResponseService]
})
export class AiResponseModule {}
