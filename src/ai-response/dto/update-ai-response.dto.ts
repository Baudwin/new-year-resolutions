import { PartialType } from '@nestjs/mapped-types';
import { CreateAiResponseDto } from './create-ai-response.dto';

export class UpdateAiResponseDto extends PartialType(CreateAiResponseDto) {}
