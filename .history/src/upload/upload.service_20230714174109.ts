import { Injectable } from "@nestjs/common";
import * as fs from "fs";

@Injectable()
export class UploadService {
    constructor(){}

    async uploadLocal(request) {
        const file = request.file[0];
        
        try {
          fs.readdirSync(`./public/uploads`);
        } catch (err) {
          fs.mkdirSync(`./public/uploads`);
        }
        
        const now = this.Moment().format("YYYYMMDD");
        
        try {
          fs.readdirSync(`./public/uploads/${now}`);
        } catch (err) {
          fs.mkdirSync(`./public/uploads/${now}`);
        }
        
        fs.writeFileSync(
          `./public/uploads/${now}/${file.originalname}`,
          file.buffer,
        );
        
        // 数据返回
        return {
          code:0,
          data:{
            fileUrl: `uploads/${now}/${file.originalname}`,
          }
        }
      }
      
      作者：webxue
      链接：https://juejin.cn/post/7222310732292915259
      来源：稀土掘金
      著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
}