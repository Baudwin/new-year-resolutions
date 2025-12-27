import { Module } from '@nestjs/common';
import { UsageLimitService } from './usage-limit.service';
import { UsageLimitController } from './usage-limit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageLimit } from './entities/usage-limit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UsageLimit])],
  controllers: [UsageLimitController],
  providers: [UsageLimitService],
  exports:[UsageLimitService]
})
export class UsageLimitModule {}
