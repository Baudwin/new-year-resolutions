import { Controller} from '@nestjs/common';
import { AiResponseService } from './ai-response.service';


@Controller('ai-response')
export class AiResponseController {
  constructor(private readonly aiResponseService: AiResponseService) {}

  }

