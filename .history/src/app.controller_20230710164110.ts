import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: any): string {
    // 设置session
    req.session.name = 'codersx';
    return req.session;
  }

  @Get('/session')
  // 可以使用@Session()获取session或者req获取
  getSession(@Req() req, @Session() session: Record<string, any>): string {
    console.log(
      '🚀 ~ file: app.controller.ts:15 ~ AppController ~ session:',
      req.session,
    );
    console.log(
      '🚀 ~ file: app.controller.ts:26 ~ AppController ~ getSession ~ session.username:',
      req.session.name,
    );
    console.log(
      '🚀 ~ file: app.controller.ts:17 ~ AppController ~ getSession ~ session:',
      session,
    );

    return req.session.name;
  }

作者：躺平的sx
链接：https://juejin.cn/post/7249755414912712760
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
}
