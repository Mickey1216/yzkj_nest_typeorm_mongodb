import { Controller, Get, Post, Request, UseGuards, Req, Session, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}