import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import * as crypto from 'crypto';

@Injectable()
export class ToolsService {
  async captche(size = 4) {
    const captcha = svgCaptcha.create({ // 可配置返回的图片信息
      size, // 生成几个验证码
      fontSize: 40, // 文字大小
      width: 100, // 宽度
      height: 34, // 高度
      background: '#3399FF', // 背景颜色
    });
    return captcha;
  }
}

