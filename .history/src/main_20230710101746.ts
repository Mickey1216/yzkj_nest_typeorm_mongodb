import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { HttpExceptionFilter } from "./common/filter/http-exception/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'liuererder'
    }),
  );

  // 处理跨域
  app.enableCors();

  // 
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
