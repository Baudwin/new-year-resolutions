import { Controller, Post, Body, Param, Req } from '@nestjs/common';
import { CheckInService } from './checkins.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { ResolutionService } from 'src/resolution/resolution.service';

@Controller('check-ins')
export class CheckInController {
  constructor(
    private readonly checkInService: CheckInService,
    private readonly resolutionService: ResolutionService,
  ) {}

  @Post(':resolutionId')
  async createCheckIn(
    @Param('resolutionId') resolutionId: string,
    @Body() dto: CreateCheckInDto,
    @Req() req: Request,
  ) {
    const anonymousUser = req['anonymousUser'];

    const resolution = await this.resolutionService.findByIdAndUser(
        resolutionId,
        anonymousUser,
      );

    return this.checkInService.create(
      dto.text ?? null,
      resolution,
      anonymousUser,
    );
  }
}
