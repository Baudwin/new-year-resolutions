import { Injectable } from '@nestjs/common';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
import { Repository } from 'typeorm';
import { Resolution } from './entities/resolution.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AnonymousUser } from 'src/anonymous-user/entities/anonymous-user.entity';

@Injectable()
export class ResolutionService {

    constructor(
      @InjectRepository(Resolution)
      private resolutionRepository:Repository<Resolution>
    ){}


 async create(createResolutionDto: CreateResolutionDto, anonymousUser:AnonymousUser) {
  const newResolution = this.resolutionRepository.create(
    {text:createResolutionDto.text,
      isPublic:createResolutionDto.isPublic,
      anonymousUser
    }
  )
    return this.resolutionRepository.save(newResolution)
  }
  

  findAll() {
    return `This action returns all resolution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resolution`;
  }

  update(id: number, updateResolutionDto: UpdateResolutionDto) {
    return `This action updates a #${id} resolution`;
  }

  remove(id: number) {
    return `This action removes a #${id} resolution`;
  }
}
