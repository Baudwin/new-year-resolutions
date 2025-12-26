import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnonymousUserService } from './anonymous-user.service';
import { CreateAnonymousUserDto } from './dto/create-anonymous-user.dto';
import { UpdateAnonymousUserDto } from './dto/update-anonymous-user.dto';

@Controller('anonymous-user')
export class AnonymousUserController {
  constructor(private readonly anonymousUserService: AnonymousUserService) {}

  @Post()

  // create(@Body() createAnonymousUserDto: CreateAnonymousUserDto) {
  //   return this.anonymousUserService.create(createAnonymousUserDto);
  // }

  @Get()
  findAll() {
    return this.anonymousUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anonymousUserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnonymousUserDto: UpdateAnonymousUserDto) {
    return this.anonymousUserService.update(id, updateAnonymousUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anonymousUserService.remove(id);
  }
}
