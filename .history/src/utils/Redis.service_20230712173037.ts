import { Injectable } from '@nestjs/common';
import Ioredis from "ioredis";
import { REDIS } from '../config/config';

@Injectable()
export class RedisService {
    private redisCache;
    constructor(){
        // 通过实例化Ioredis来初始化Redis
  this.redisCache = new Ioredis({
    port: REDIS.port,
    host: REDIS.host,
    password: REDIS.password,
    db: REDIS.db,
  });

作者：webxue
链接：https://juejin.cn/post/7221151497973841977
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    }
}
