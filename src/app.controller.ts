import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  getHello(): string {
    return this.appService.getHello();
  }
}
