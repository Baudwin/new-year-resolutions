import { PartialType } from '@nestjs/mapped-types';
import { CreateUsageLimitDto } from './create-usage-limit.dto';

export class UpdateUsageLimitDto extends PartialType(CreateUsageLimitDto) {}
