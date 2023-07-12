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

    /**
     * 
     * @param param0 ttl：存储时长，单位秒，默认给的是60 * 5，也就是将验证码保留5分钟 type：存储类型，EX代表秒，PX代表毫秒，默认给的是EX。
     * @returns 
     */
    async set({ key, value, type = "EX"，ttl = 60 * 5,  }){
        return await this.redisCache.set(key, value, type, ttl);
    }

    async get(key: string) {
        return await this.redisCache.get(key);
    }
}
