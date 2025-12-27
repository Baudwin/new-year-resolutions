import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AnonymousUserService } from './anonymous-user.service';
import { AnonymousUserController } from './anonymous-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnonymousUser } from './entities/anonymous-user.entity';
import { AnonymousUserMiddleware } from './anonymous-user.middleware';

@Module({
    imports:[TypeOrmModule.forFeature([AnonymousUser])],
  controllers: [AnonymousUserController],
  providers: [AnonymousUserService],
  exports:[AnonymousUserService]
})
export class AnonymousUserModule implements NestModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(AnonymousUserMiddleware)
    .forRoutes('*')
  }
}
