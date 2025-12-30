import { Injectable } from '@nestjs/common';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { Repository } from 'typeorm';
import { Resolution } from './entities/resolution.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AnonymousUser } from 'src/anonymous-user/entities/anonymous-user.entity';
import { PublicResolutionsResponse } from './dto/public-resolutions.dto';

const PAGE_SIZE = 20;

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


   async getResolutions( cursor?: string ): Promise<PublicResolutionsResponse> {
    const query = this.resolutionRepository
      .createQueryBuilder('r')
      .select(['r.id', 'r.text', 'r.createdAt'])
      .where('r.isPublic = true')
      .orderBy('r.createdAt', 'DESC')
      .addOrderBy('r.id', 'DESC')
      .take(PAGE_SIZE + 1);

    if (cursor) {
      const decoded = Buffer.from(cursor, 'base64').toString('utf8');
      const { createdAt, id } = JSON.parse(decoded);

      query.andWhere(
        '(r.createdAt < :createdAt OR (r.createdAt = :createdAt AND r.id < :id))',
        { createdAt, id },
      );
    }

    const results = await query.getMany();

    let nextCursor: string | null = null;

    if (results.length > PAGE_SIZE) {
      const last = results[PAGE_SIZE - 1];

      nextCursor = Buffer.from(
        JSON.stringify({
          createdAt: last.createdAt,
          id: last.id,
        }),
      ).toString('base64');

      results.pop();
    }

    return {
      items: results.map((r) => ({
        id: r.id,
        text: r.text,
      })),
      nextCursor,
    };
  }


  findAll() {
    return `This action returns all resolution`;
  }


  async findByIdAndUser(resolutionId: string, anonymousUser:AnonymousUser):Promise<Resolution>{
    const resolution = await this.resolutionRepository.findOne({
      where:{
        id:resolutionId,
        anonymousUser:{
          id:anonymousUser.id
        }
      },
      relations:{
        aiResponse:true
      }
    })

    return resolution
  }



  async getLatest(anonymousUser:AnonymousUser){
    const latestResolution = await this.resolutionRepository.findOne(
      {
      where:{anonymousUser:{
        id:anonymousUser.id
      }},
      order:{
        createdAt:"DESC"
      },
      relations:{
        aiResponse:true
      }
    }
  )
// console.log(anonymousUser)
// console.log(latestResolution)
    return latestResolution
  }



}
