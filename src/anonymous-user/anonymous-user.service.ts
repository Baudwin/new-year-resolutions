import { Injectable } from '@nestjs/common';
import { CreateAnonymousUserDto } from './dto/create-anonymous-user.dto';
import { UpdateAnonymousUserDto } from './dto/update-anonymous-user.dto';

@Injectable()
export class AnonymousUserService {
  create(createAnonymousUserDto: CreateAnonymousUserDto) {
    return 'This action adds a new anonymousUser';
  }

  findAll() {
    return `This action returns all anonymousUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anonymousUser`;
  }

  update(id: number, updateAnonymousUserDto: UpdateAnonymousUserDto) {
    return `This action updates a #${id} anonymousUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} anonymousUser`;
  }
}
