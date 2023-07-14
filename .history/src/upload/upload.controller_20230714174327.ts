import { Controller, Post, UseInterceptors } from "@nestjs/common";
import { BaseController } from "./base.controller";
import { UploadService } from "./upload.service";

@Controller("upload")
export class UploadController extends BaseController {
    constructor(private readonly uploadService: UploadService) {
        super();
    }

    @Post("local")
    uploadLocal(@UploadedFiles() request) {
        return this.uploadService.uploadLocal();
    }
}