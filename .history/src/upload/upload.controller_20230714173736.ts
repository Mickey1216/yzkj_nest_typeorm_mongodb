import { Controller } from "@nestjs/common";
import { BaseController } from "../core/base.controller";
import { UploadService } from "../service/upload.service";

@Controller("upload")
export class UploadController extends BaseController {
  constructor(private readonly uploadService: UploadService) {
    super();
  }
}