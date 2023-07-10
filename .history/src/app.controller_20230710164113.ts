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
}
