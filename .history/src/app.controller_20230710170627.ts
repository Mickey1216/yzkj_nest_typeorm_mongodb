import { Controller, Get, Post, Request, UseGuards, Req, Session, Res } from '@nestjs/common';
import { ToolsService } from 'src/utils/tools.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly toolsService: ToolsService) {}

  // 当请求该接口时，返回一张随机图片验证码
  @Get()  
  async getCode(@Req() req: any, @Res() res: any) {
    // // 设置session
    // req.session.name = 'codersx';
    // console.log(req.session.name)
    // return req.session;

    const svgCaptcha = await this.toolsService.captche(); // 创建验证码
    // console.log(typeof svgCaptcha.text)
    req.session.code = svgCaptcha.text; // 使用session保存验证，用于登陆时验证

    res.type('image/svg+xml'); // 指定返回的类型
    res.send(svgCaptcha.data); // 给页面返回一张图片
    console.log(req.session.code);
    
  }

  @Get('session')
  // 可以使用@Session()获取session或者req获取
  getSession(@Req() req, @Session() session: Record<string, any>): string {
    console.log(
      '🚀 ~ file: app.controller.ts:15 ~ AppController ~ session:',
      req.session,
    );
    console.log(
      '🚀 ~ file: app.controller.ts:26 ~ AppController ~ getSession ~ session.name:',
      req.session.name,
    );
    console.log(
      '🚀 ~ file: app.controller.ts:17 ~ AppController ~ getSession ~ session:',
      session,
    );

    return req.session.code;
  }
}
