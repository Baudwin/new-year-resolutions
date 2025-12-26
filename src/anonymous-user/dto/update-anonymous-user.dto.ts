import { PartialType } from '@nestjs/mapped-types';
import { CreateAnonymousUserDto } from './create-anonymous-user.dto';

export class UpdateAnonymousUserDto extends PartialType(CreateAnonymousUserDto) {}
