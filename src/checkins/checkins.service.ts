import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckIn } from './entities/checkin.entity';
import { Repository } from 'typeorm';
import { Resolution } from 'src/resolution/entities/resolution.entity';
import { AnonymousUser } from 'src/anonymous-user/entities/anonymous-user.entity';

@Injectable()
export class CheckInService {
  constructor(
    @InjectRepository(CheckIn)
    private readonly checkInRepo: Repository<CheckIn>,
  ) {}

  async create(
    text: string | null,
    resolution: Resolution,
    anonymousUser: AnonymousUser,
  ) {
    const checkIn = this.checkInRepo.create({
      text,
      resolution,
      anonymousUser,
    });

    return this.checkInRepo.save(checkIn);
  }
}
