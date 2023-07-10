import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { HttpExceptionFilter } from "./common/filter/http-exception/http-exception.filter";
import { TransformInterceptor } from "./common/interceptor/transform/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 配置session
  app.use(
    session({
      secret: 'liuererder'
    }),
  );

  // 处理跨域
  app.enableCors();

  // 注册统一的异常处理器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册返回格式化拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
