import { Controller, Get, Post, Body, Req, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ToolsService } from 'src/utils/tools.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  regRules: Object

  constructor(
    private readonly userService: UserService,
    private readonly toolsService: ToolsService
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
  async getCode(@Req() req, @Res() res) {
    const svgCaptcha = await this.toolsService.captche(); // 创建验证码
    req.session.code = svgCaptcha.text; // 使用session保存验证，用于登陆时验证

    res.type('image/svg+xml'); // 指定返回的类型
    res.send(svgCaptcha.data); // 给页面返回一张图片
  }

  // 注册接口
  @Post('register')
  register(@Body() regiaterParams: User, @Session() session) {
    const { authCode } = regiaterParams

    if(authCode?.toUpperCase() !== session.code?.toUpperCase()){
      return {
        code: 400,
        msg: "验证码错误"
      }
    }
    
    for(let key in regiaterParams) {
      if(!this.regRules[key].test(regiaterParams[key])) {
        return {
          code: 400,
          msg: "参数错误"
        }
      }
    }

    // 验证用户名或邮箱或手机号是否已经注册
    this.userService.checkExisted(regiaterParams.userName, regiaterParams.email, regiaterParams.phone)
    
    let res = this.userService.register(regiaterParams)
    return {
      code: res ? 200 : 400,
      msg: "注册" + (res ? "成功" : "失败")
    }
  }
}
