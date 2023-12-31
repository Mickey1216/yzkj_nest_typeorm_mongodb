import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from "path";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadController } from './upload/upload.controller';

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
    AuthModule
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
