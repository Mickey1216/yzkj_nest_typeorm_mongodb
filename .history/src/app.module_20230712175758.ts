import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'test',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../", "public") // 设置静态资源的根目录（rootPath)为src/public目录下。
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
