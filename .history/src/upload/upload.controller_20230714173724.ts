import { Controller } from "@nestjs/common";
import { BaseControlle } from "../core/base.controller";
import { UploadService } from "../service/upload.service";

@Controller("upload")
export class UploadController extends BaseControlle {
  constructor(private readonly uploadService: UploadService) {
    super();
  }
}