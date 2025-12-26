import { Injectable } from '@nestjs/common';
import { CreateAnonymousUserDto } from './dto/create-anonymous-user.dto';
import { UpdateAnonymousUserDto } from './dto/update-anonymous-user.dto';
import { Repository } from 'typeorm';
import { AnonymousUser } from './entities/anonymous-user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnonymousUserService {

   constructor (
          @InjectRepository(AnonymousUser)
          private anonUserRepository:Repository<AnonymousUser>
          
        ){}
        

  async create(): Promise<AnonymousUser> {
    const newUser = this.anonUserRepository.create();
    // console.log("in create anon user service")
    return this.anonUserRepository.save(newUser);
  }

  
  findAll(): Promise<AnonymousUser[]> {
    return this.anonUserRepository.find();
  }
   
  findOne(id: string): Promise<AnonymousUser | null> {
    return this.anonUserRepository.findOneBy({ id });
  }
  
  update(id: string, updateAnonymousUserDto: UpdateAnonymousUserDto) {
    return `This action updates a #${id} anonymousUser`;
  }

  async remove(id: string): Promise<void> {
    await this.anonUserRepository.delete(id);
  }
}
