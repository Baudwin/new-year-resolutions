import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8080

  app.use(cookieParser())

    app.enableCors({
    origin:`${process.env.FRONTEND_URL}`,             
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });


  await app.listen(port);
  console.log(`Server is listening on port ${port}`)
}

bootstrap();
