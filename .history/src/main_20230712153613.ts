import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { HttpExceptionFilter } from "./common/filter/http-exception/http-exception.filter";
import { TransformInterceptor } from "./common/interceptor/transform/transform.interceptor";
import { getLogger } from 'xmcommon';
import { NestLogger } from '';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置session
  app.use(
    session({
      // 必需的配置项，用于加密和签名会话数据的密钥；应该使用一个安全的随机字符串作为密钥。
      secret: 'liuererder',
      // 指定会话cookie的名称，默认为"connect.sid"。
      name: 'llssid',
      rolling: true,
      cookie: {
        // 设置cookie的过期时间（以毫秒为单位）
        maxAge: null,
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
