import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckInDto } from './create-checkin.dto';

export class UpdateCheckinDto extends PartialType(CreateCheckInDto) {}
