import { Module } from '@nestjs/common';
import { CheckInService } from './checkins.service';
import { CheckInController } from './checkins.controller';
import { ResolutionModule } from 'src/resolution/resolution.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from './entities/checkin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CheckIn]), ResolutionModule],
  controllers: [CheckInController],
  providers: [CheckInService],
})
export class CheckinsModule {}
