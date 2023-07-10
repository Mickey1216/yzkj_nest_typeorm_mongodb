import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 用户注册
  async register(user: User) {
    // 将用户密码进行加密
    user.password = createHash("sha256").update(user.password).digest("hex");

    // return await this.userRepository.save(user);

    // 判断该用户是否已经注册过
    if(this.checkExisted(user.userName, user.email, user.phone)){
      console.log(user)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST)
    }
      
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 用户登录
  async findOne(name: string): Promise<any | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        userName: name
      },
    });
    if (user == undefined) {
      return void 0;
    } else {
      return user;
    }
  }

  // 检查该用户是否已经注册过，userName、email和phone唯一
  async checkExisted(userName: string, email: string, phone: string) {
    console.log(userName, email, phone);
    const temp = await this.userRepository.findOne({
          where: { userName },
    })
    console.log('');
    
    // if (
    //   !(await this.userRepository.findOne({
    //     where: { userName },
    //   }))
    // ){
    //   console.log('here')
    //   return false;
    // }
      
    // else if (
    //   !(await this.userRepository.findOne({
    //     where: { email },
    //   }))
    // )
    //   return false;
    // else if (
    //   !(await this.userRepository.findOne({
    //     where: { phone },
    //   }))
    // )
    //   return false;
    
    // return true;
  }

  // 获取全部用户信息
  async findAllUser(): Promise<User[]> {
    // 测试统一的异常处理器
    // throw new HttpException('禁止访问', HttpStatus.FORBIDDEN);

    // 测试返回格式化拦截器
    // throw new ApiException('用户不存在', ApiErrorCode.USER_NOTEXIST);

    return await this.userRepository.find();
  }
}
