import { Controller, Get, Post, Body, Req, Res, Session, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import * as svgCaptcha  from 'svg-captcha';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ImgAuthCodeService } from 'src/utils/ImgAuthCode.service';
import { EmailAuthCodeService } from '../utils/EmailAuthCode.service';
import { RedisService } from '../utils/Redis.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  regRules: Object

  constructor(
    private readonly userService: UserService,
    private readonly imgAuthCodeService: ImgAuthCodeService,
    private readonly emailAuthCodeService: EmailAuthCodeService,
    private readonly redisService: RedisService
  ) {
    this.regRules = {
      userName: new RegExp("[\u4e00-\u9fa5a-zA-Z]{1,10}"),
      password: new RegExp("[0-9a-zA-Z]{6,8}"),
      email: new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"),
      phone: new RegExp("^[1][3, 4, 5, 6, 7, 8, 9][0-9]{9}$")
    }
  }

  // 当请求该接口时，返回一张随机图片验证码
  @Get('authcode')  
  async getCode(@Session() session: Record<string, any>, @Res() res: Response) {
    const svgCaptcha = await this.imgAuthCodeService.captche(); // 创建验证码
    session.code = svgCaptcha.text; // 使用session保存验证，用于登陆时验证
    res.type('image/svg+xml'); // 指定返回的类型
    res.send(svgCaptcha.data); // 给页面返回一张图片
  }

  // 当请求该接口时，向邮箱发送验证码
  @Get('emailcode')
  async getEmailCode(@Query() query: any) {
    const { email } = query;
    const code = await this.emailAuthCodeService.send({ email, subject: "欢迎注册" });
    
    // 将验证码存储到redis中，方便后续注册时验证
    await this.redisService.set({ key: `email:register:${email}`, value: code });

    return code;
  }

  // 注册接口
  @Post('register')
  register(@Body() registerParams: CreateUserDto, @Session() session: Record<string, any>) {
    const { authCode } = registerParams

    if(authCode?.toUpperCase() !== session.code?.toUpperCase()){
      return {
        code: 401,
        msg: "验证码错误"
      }
    }
    
    for(let key in registerParams) {
      if (key === 'authCode') 
        continue;
      
      if(!this.regRules[key].test(registerParams[key])) {
        return {
          code: 402,
          msg: "其他参数错误"
        }
      }
    }

    return this.userService.register(registerParams);
  }

  // 分页获取用户信息接口
  @Get('list')
  async getUserList(@Query() query: any) {
    const { page, pageSize } = query;
    return { 
      infos: await this.userService.fetchUsersInfo(+page, +pageSize),
      total: await this.userService.fetchUsersCount() 
    };
  }
}
