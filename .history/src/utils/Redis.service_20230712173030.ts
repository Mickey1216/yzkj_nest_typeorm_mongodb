import { Injectable } from '@nestjs/common';
import Ioredis from "ioredis";
import { REDIS } from '../config/config';

@Injectable()
export class RedisService {
    private redisCache;
    constructor(){
        
    }
}
