import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ToolsService } from '../utils/tools.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 这里需要申明，就可以使用User这个实体了
  controllers: [UserController],
  providers: [UserService, ToolsService],
  exports: [UserService]
})
export class UserModule {}
