import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnonymousUserModule } from './anonymous-user/anonymous-user.module';
import { UsageLimitModule } from './usage-limit/usage-limit.module';
import { AiResponseModule } from './ai-response/ai-response.module';
import { ResolutionModule } from './resolution/resolution.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal:true
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: false, 
      // logging: false,
    }),
    
    
    AnonymousUserModule, ResolutionModule, AiResponseModule, UsageLimitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
