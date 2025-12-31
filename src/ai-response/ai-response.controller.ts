import { Controller, Param, Post, Req, UnauthorizedException} from '@nestjs/common';
import { AiResponseService } from './ai-response.service';
import { Request } from 'express';


@Controller('ai-response')
export class AiResponseController {
  constructor(private readonly aiResponseService: AiResponseService) {}

  @Post(':id/keep')
  async keepResponse(
    @Param('id') id:string,
    @Req() req:Request
  ){
    const anonymousUser = req['anonymousUser']

    if (!anonymousUser) {
      throw new UnauthorizedException()
    }

    return this.aiResponseService.keepResponse(id,anonymousUser.id)
  }


  }

