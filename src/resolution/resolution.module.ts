import { Module } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { ResolutionController } from './resolution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resolution } from './entities/resolution.entity';
import { AnonymousUserModule } from 'src/anonymous-user/anonymous-user.module';
import { UsageLimitModule } from 'src/usage-limit/usage-limit.module';
import { AiResponseModule } from 'src/ai-response/ai-response.module';
import { OpenAiConfigModule } from 'src/open-ai-config/open-ai-config.module';

@Module({
  imports:[TypeOrmModule.forFeature([Resolution]), AnonymousUserModule, UsageLimitModule, AiResponseModule, OpenAiConfigModule],
  controllers: [ResolutionController],
  providers: [ResolutionService],
})
export class ResolutionModule {}
 