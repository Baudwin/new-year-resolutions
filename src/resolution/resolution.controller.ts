import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';

@Controller('resolution')
export class ResolutionController {
  constructor(private readonly resolutionService: ResolutionService) {}

  @Post()
  create(@Body() createResolutionDto: CreateResolutionDto) {
    return this.resolutionService.create(createResolutionDto);
  }

  @Get()
  findAll() {
    return this.resolutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resolutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResolutionDto: UpdateResolutionDto) {
    return this.resolutionService.update(+id, updateResolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resolutionService.remove(+id);
  }
}
