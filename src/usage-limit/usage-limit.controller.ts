import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsageLimitService } from './usage-limit.service';
import { CreateUsageLimitDto } from './dto/create-usage-limit.dto';
import { UpdateUsageLimitDto } from './dto/update-usage-limit.dto';

@Controller('usage-limit')
export class UsageLimitController {
  constructor(private readonly usageLimitService: UsageLimitService) {}

  @Post()
  create(@Body() createUsageLimitDto: CreateUsageLimitDto) {
    return this.usageLimitService.create(createUsageLimitDto);
  }

  @Get()
  findAll() {
    return this.usageLimitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usageLimitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsageLimitDto: UpdateUsageLimitDto) {
    return this.usageLimitService.update(+id, updateUsageLimitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usageLimitService.remove(+id);
  }
}
