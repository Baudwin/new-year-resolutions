import { Controller, Get, Post, Body, Patch, Param, Delete,Req, BadRequestException, Query } from '@nestjs/common';
import { Request } from 'express';
import { ResolutionService } from './resolution.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { AnonymousUserService } from 'src/anonymous-user/anonymous-user.service';
import { UsageLimitService } from 'src/usage-limit/usage-limit.service';
import { OpenAiService } from 'src/open-ai-config/openai-config-service';
import { AiResponseService } from 'src/ai-response/ai-response.service';

@Controller('resolution')
export class ResolutionController {
  constructor(private readonly resolutionService: ResolutionService,
              private readonly anonymousUserService:AnonymousUserService,
              private readonly usageLimitService: UsageLimitService,
              private readonly openAiService:OpenAiService,
              private readonly aiResponseService:AiResponseService

  ) {}

  @Post()
 async create(@Body() createResolutionDto: CreateResolutionDto,
  @Req() req:Request
) {
  const anonUserId = req.cookies.anon_user_id
  if(!anonUserId){
    throw new BadRequestException('User not found')
  }
  const anonymousUser = await this.anonymousUserService.findOne(anonUserId)

   if(!anonymousUser){
    throw new BadRequestException('User not found')
  }

  await this.usageLimitService.checkUsageAndIncrement(anonymousUser)

    const resolution = await this.resolutionService.create(
      createResolutionDto,
      anonymousUser!
    )

  const aiResponseText= await this.openAiService.generateResolutionResponse(resolution.text)

    const aiResponse = await this.aiResponseService.create(
      resolution,
      aiResponseText,
      'gpt-4o-mini',
    );


    return  {
    resolution: {
      id: resolution.id,
      text: resolution.text,
      createdAt: resolution.createdAt,
    },
    aiResponse: {
      text: aiResponse.responseText,
      createdAt: aiResponse.createdAt,
    },
  };

  }

  @Get('public')
  getPublicResolutions(
    @Query('cursor') cursor?: string,
  ) {
    return this.resolutionService.getResolutions(cursor);
  }

 
}
