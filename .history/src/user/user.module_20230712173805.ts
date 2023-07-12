import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ImgAuthCodeService } from '../utils/ImgAuthCode.service';
import { EmailAuthCodeService } from '../utils/EmailAuthCode.service';
import { RedisService } from '../utils/Redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 这里需要申明，就可以使用User这个实体了
  controllers: [UserController],
  providers: [UserService, ImgAuthCodeService, EmailAuthCodeService, RedisService],
  exports: [UserService]
})
export class UserModule {}
