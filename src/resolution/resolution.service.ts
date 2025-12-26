import { Injectable } from '@nestjs/common';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
import { Repository } from 'typeorm';
import { Resolution } from './entities/resolution.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResolutionService {

    constructor(
      @InjectRepository(Resolution)
      private resolutionRepository:Repository<Resolution>
    ){}


  create(createResolutionDto: CreateResolutionDto) {
    return 'This action adds a new resolution';
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
