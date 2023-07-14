import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { BaseController } from "./base.controller";
import { UploadService } from "./upload.service";

@Controller("upload")
export class UploadController extends BaseController {
    constructor(private readonly uploadService: UploadService) {
        super();
    }

    @Post("local")
    @UseInterceptors(FileFieldsInterceptor([
        { name: "file", maxCount: 1 },
        { name: "custom" }
    ]))
    uploadLocal(@UploadedFiles() request) {
        return this.uploadService.uploadLocal(request);
    }
}