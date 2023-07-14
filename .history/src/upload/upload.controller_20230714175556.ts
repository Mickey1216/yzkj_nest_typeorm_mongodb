import {
    Body,
    Controller,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { XCommonRet } from 'xmcommon';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
    @Post('up')
    @UseInterceptors(FileInterceptor('file'))
    public up(@UploadedFile() file: Express.Multer.File, @Body() body) {
        const r = new XCommonRet<number>();
        do {
            //
            console.log(file);
            console.log(body);
        } while (false);
        return r;
    }

    @Post('download')
    public download(@Res() res: Response) {
        const filePath =
            'c:\\temp\\测试.zip';
        res.download(filePath, (err) => {
            if (!err) {
                console.log('success', 'download', filePath);
                return;
            }

            console.error(err);
            res.send({ err: -1, msg: String(err) });
        });
    }

    @Post('view')
    public view(@Res() res: Response) {
        const filePath =
            'c:\\temp\\测试.jpg';
        res.sendFile(filePath, (err) => {
            if (!err) {
                console.log('success', 'view', filePath);
                return;
            }
            console.error(err);
            res.send({ err: -1, msg: String(err) });
        });
    }
}

————————————————
版权声明：本文为CSDN博主「过客猫2022」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/zdhsoft/article/details/121644432
