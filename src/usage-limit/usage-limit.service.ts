import { Injectable } from '@nestjs/common';
import { CreateUsageLimitDto } from './dto/create-usage-limit.dto';
import { UpdateUsageLimitDto } from './dto/update-usage-limit.dto';

@Injectable()
export class UsageLimitService {
  create(createUsageLimitDto: CreateUsageLimitDto) {
    return 'This action adds a new usageLimit';
  }

  findAll() {
    return `This action returns all usageLimit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usageLimit`;
  }

  update(id: number, updateUsageLimitDto: UpdateUsageLimitDto) {
    return `This action updates a #${id} usageLimit`;
  }

  remove(id: number) {
    return `This action removes a #${id} usageLimit`;
  }
}
