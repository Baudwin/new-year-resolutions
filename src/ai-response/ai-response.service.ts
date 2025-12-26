import { Injectable } from '@nestjs/common';
import { CreateAiResponseDto } from './dto/create-ai-response.dto';
import { UpdateAiResponseDto } from './dto/update-ai-response.dto';

@Injectable()
export class AiResponseService {
  create(createAiResponseDto: CreateAiResponseDto) {
    return 'This action adds a new aiResponse';
  }

  findAll() {
    return `This action returns all aiResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aiResponse`;
  }

  update(id: number, updateAiResponseDto: UpdateAiResponseDto) {
    return `This action updates a #${id} aiResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} aiResponse`;
  }
}
