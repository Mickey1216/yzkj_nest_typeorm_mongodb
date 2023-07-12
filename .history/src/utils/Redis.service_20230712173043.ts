import { Injectable } from '@nestjs/common';
import Ioredis from "ioredis";
import { REDIS } from '../config/config';

@Injectable()
export class RedisService {
    private redisCache;
    constructor() {
        // 通过实例化Ioredis来初始化Redis
        this.redisCache = new Ioredis({
            port: REDIS.port,
            host: REDIS.host,
            password: REDIS.password,
            db: REDIS.db,
        });

    }
}