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
      // 必需的配置项，用于加密和签名会话数据的密钥；应该使用一个安全的随机字符串作为密钥。
      secret: 'liuererder',
      // 指定会话 cookie的名称，默认为 "connect.sid"。
      name: 'llssid',
      // 是否强制将“未初始化”的会话保存到存储中, 默认true
      saveUninitialized: false,
      // 是否前置保存会话
      resave: false,
      
      cookie: {
        // 过期时间, 单位毫秒。这里设置1分钟
        maxAge: 600000,
        // cookie是否签名
        signed: false,
        domain:'127.0.0.1',
      },
    }),
  );

  // 处理跨域
  app.enableCors();

  // 注册统一的异常处理器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册请求成功后返回的格式化拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
