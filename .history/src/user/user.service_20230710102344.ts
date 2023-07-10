import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 用户注册
  async register(user: User) {
    user.password = createHash("sha256").update(user.password).digest("hex");
    return await this.userRepository.save(user);
  }

  // 用户登录
  // async login(user: User) {
  //   return await this.userRepository.findOne({
  //     where: { userName: user.userName, password: user.password },
  //   });
  // }

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

  async checkExisted(userName: string, email: string, phone: string) {
    if (
      !(await this.userRepository.findOne({
        where: { userName },
      }))
    )
      return false;
    else if (
      !(await this.userRepository.findOne({
        where: { email },
      }))
    )
      return false;
    else if (
      !(await this.userRepository.findOne({
        where: { phone },
      }))
    )
      return false;
    
    return true;
  }
}
