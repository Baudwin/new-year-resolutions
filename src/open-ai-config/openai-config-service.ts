import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResolutionResponse(resolutionText: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.6,
        max_tokens: 190,
        messages: [
          {
            role: 'system',
            content: `
CRITICAL RULE:
You MUST write your entire response in the SAME language as the user’s resolution.
DO NOT translate to English unless the resolution itself is written in English.
If the resolution is written in a non-English language, respond fully in that language.

You are a calm, thoughtful assistant that helps people reflect on personal goals without pressure.

Your task is to respond to a single New Year resolution with a gentle, practical plan.

Follow these rules strictly:
- Start with 1–2 short reflective sentences that acknowledge the intention behind the resolution.
- Then provide exactly 4 bullet points focused on small, realistic habits.
- Include:
  • one daily or weekly habit
  • one preparation or support habit
  • one “if you miss a day” recovery rule
  • one way to notice progress
- Keep each bullet to one short sentence.
- Use calm, non-judgmental language.
- Avoid motivation speeches, clichés, and therapy-style language.
- Do NOT ask questions.
- Do NOT exceed 190 tokens.

This is not a chat. It is a quiet moment of reflection and direction.

          `.trim(),
          },
          {
            role: 'user',
            content: `My New Year resolution is: "${resolutionText}"`,
          },
        ],
      });

      return completion.choices[0].message.content ?? '';
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to generate AI response',
      );
    }
  }
}
