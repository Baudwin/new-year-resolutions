import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsageLimit } from './entities/usage-limit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AnonymousUser } from 'src/anonymous-user/entities/anonymous-user.entity';

const daily_usage_limit = 3

@Injectable()
export class UsageLimitService {

    constructor (
      @InjectRepository(UsageLimit)
      private readonly usageLimitRepository: Repository<UsageLimit>
    ){}


     async checkUsageAndIncrement (anonymousUser:AnonymousUser):Promise<void>{
      const todaysDate = new Date().toISOString().split('T')[0]

      let existingUsage = await this.usageLimitRepository.findOne({
        where:{
          anonymousUserId:anonymousUser.id,
          date:todaysDate
        }
      })


      if (!existingUsage) {
      const newUsage = this.usageLimitRepository.create({
        anonymousUserId:anonymousUser.id,
        date:todaysDate,
        aiRequestsCount:1
      })

      await this.usageLimitRepository.save(newUsage)
      return
      }

      if (existingUsage.aiRequestsCount>= daily_usage_limit) {
        throw new ForbiddenException("You have exeeded your daily limit. Please try again tomorrow.")
      }


      existingUsage.aiRequestsCount +=1;
      await this.usageLimitRepository.save(existingUsage) 

     }

}
