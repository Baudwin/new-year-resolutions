import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AiResponseService } from './ai-response.service';
import { CreateAiResponseDto } from './dto/create-ai-response.dto';
import { UpdateAiResponseDto } from './dto/update-ai-response.dto';

@Controller('ai-response')
export class AiResponseController {
  constructor(private readonly aiResponseService: AiResponseService) {}

  @Post()
  create(@Body() createAiResponseDto: CreateAiResponseDto) {
    return this.aiResponseService.create(createAiResponseDto);
  }

  @Get()
  findAll() {
    return this.aiResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiResponseDto: UpdateAiResponseDto) {
    return this.aiResponseService.update(+id, updateAiResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiResponseService.remove(+id);
  }
}
