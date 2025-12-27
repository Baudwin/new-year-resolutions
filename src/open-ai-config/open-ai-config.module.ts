import { Module } from '@nestjs/common';
import { OpenAiService } from './openai-config-service';

@Module({
    providers: [OpenAiService],
    exports:[OpenAiService]
})
export class OpenAiConfigModule {
}
