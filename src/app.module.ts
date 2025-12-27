import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnonymousUserModule } from './anonymous-user/anonymous-user.module';
import { UsageLimitModule } from './usage-limit/usage-limit.module';
import { AiResponseModule } from './ai-response/ai-response.module';
import { ResolutionModule } from './resolution/resolution.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { OpenAiConfigModule } from './open-ai-config/open-ai-config.module';


@Module({
  imports: [

     ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 20,
        },
      ],
    }),

    ConfigModule.forRoot({
      isGlobal:true
    }),

    TypeOrmModule.forRoot(
    //   {
    //   type: 'postgres',
    //   host: process.env.DATABASE_HOST,
    //   port: parseInt(process.env.DATABASE_PORT, 10),
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   autoLoadEntities: true,
    //   synchronize: process.env.NODE_ENV !== 'production',
    //   ssl: false, 
    //   // logging: false,
    // }
  
    {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  autoLoadEntities: true,
  synchronize: false,
}
  ),
    
    
    AnonymousUserModule, ResolutionModule, AiResponseModule, UsageLimitModule, OpenAiConfigModule],
  controllers: [AppController],

  providers: [
    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },
    AppService],
})
export class AppModule {}
