import { Controller, Get, Post, Request, UseGuards, Req, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 当请求该接口时，返回一张随机图片验证码
  @Get('authcode')  
  async getCode(@Req() req: any, @Res() res: any) {
    const svgCaptcha = await this.toolsService.captche(); // 创建验证码
    // console.log(typeof svgCaptcha.text)
    req.session.name = svgCaptcha.text; // 使用session保存验证，用于登陆时验证

    res.type('image/svg+xml'); // 指定返回的类型
    res.send(svgCaptcha.data); // 给页面返回一张图片
  }

}
