import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  // 用户注册
  async register(user: CreateUserDto) {
    // 判断该用户是否已经注册过
    if (await this.checkUser(user.userName) || await this.checkEmail(user.email) || await this.checkPhone(user.phone)) {
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    }

    try {
      const newUser = await this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return {
        code: 200,
        message: '注册成功'
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  // 用户登录
  async findOne(userName: string): Promise<any | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        userName
      },
    });

    if (!user) throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    return user;
  }

  // 在用户注册时，判断该用户名是否已经注册过
  async checkUser(userName: string) {
    if (!await this.userRepository.findOne({
      where: { userName },
    })) {
      return false;
    }
    return true;
  }

  // 在用户注册时，要检测该用户的邮箱是否已经注册过
  async checkEmail(email: string) {
    if (!await this.userRepository.findOne({
      where: { email },
    })) {
      return false;
    }
    return true;
  }

  // 在用户注册时，要检测该用户的手机号是否已经注册过
  async checkPhone(phone: string) {
    if (!await this.userRepository.findOne({
      where: { phone },
    })) {
      return false;
    }
    return true;
  }

  // 分页获取用户数据
  async fetchUsersInfo(page: number, pageSizes: number): Promise<User[]> {
    return await this.userRepository.find({
      skip: (page - 1) * pageSizes,
      take: pageSizes
    });

    // 测试统一的异常处理器
    // throw new HttpException('禁止访问', HttpStatus.FORBIDDEN);

    // 测试返回格式化拦截器
    // throw new ApiException('用户不存在', ApiErrorCode.USER_NOTEXIST);
  }

  // 获取用户总数
  async fetchUsersCount(): Promise<number> {
    return await this.userRepository.count();
  }
}
