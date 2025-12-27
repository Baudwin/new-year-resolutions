import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AiResponse } from './entities/ai-response.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Resolution } from 'src/resolution/entities/resolution.entity';

@Injectable()
export class AiResponseService {
  
  constructor(
    @InjectRepository(AiResponse)
    private readonly aiResponseRepository:Repository<AiResponse>
  ){}

  async create(resolution: Resolution,responseText: string,model: string,):Promise<AiResponse>{
    const newAiResponse = this.aiResponseRepository.create({
      resolution,
      responseText,
      model
    })

    return this.aiResponseRepository.save(newAiResponse)
  }


}
