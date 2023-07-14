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
      