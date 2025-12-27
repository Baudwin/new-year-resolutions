import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsageLimitService } from './usage-limit.service';
import { CreateUsageLimitDto } from './dto/create-usage-limit.dto';
import { UpdateUsageLimitDto } from './dto/update-usage-limit.dto';

@Controller('usage-limit')
export class UsageLimitController {
  constructor(private readonly usageLimitService: UsageLimitService) {}



}
