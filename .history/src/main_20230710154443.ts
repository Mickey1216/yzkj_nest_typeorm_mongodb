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
      secret: 'liuererder',
      // 是否强制将“未初始化”的会话保存到存储中, 默认true
      saveUninitialized: false,
      // 是否前置保存会话
      resave: false,
      // 生成cookie的名称
      name: 'suuid',

作者：假装没昵称
链接：https://juejin.cn/post/7232106423243669562
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
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
