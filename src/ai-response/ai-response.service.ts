import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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


  async keepResponse(responseId:string, anonUserId:string){
    const response = await this.aiResponseRepository.findOne({
      where:{
        id:responseId,
        resolution:{
          anonymousUser:{
            id:anonUserId
          }
        }
      }, 
      relations:{
        resolution:{
          anonymousUser:true
        }
      }
    })

    if (!response) {
      throw new NotFoundException('Response not found')
    }

    response.isKept =true
    await this.aiResponseRepository.save(response)
    return {kept:true}
  }


}
