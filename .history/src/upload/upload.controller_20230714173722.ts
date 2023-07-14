import { Controller } from "@nestjs/common";
import { BaseControlle } from "../core/base.controller";
import { UploadService } from "../service/upload.service";

@Controller("upload")
export class UploadController extends BaseControlle {
  constructor(private readonly uploadService: UploadService) {
    super();
  }
}

作者：webxue
链接：https://juejin.cn/post/7222310732292915259
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。