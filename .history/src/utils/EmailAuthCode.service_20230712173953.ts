import { Injectable } from '@nestjs/common';
import * as nodemail from "nodemailer";
import { EMAIL } from '../config/config';

@Injectable()
export class EmailAuthCodeService {
    private transporter = null;

    constructor() {
        // 通过nodemail的createTransport方法创建这个服务，将config中的参数依次传入
        this.transporter = nodemail.createTransport({
            host: EMAIL.host,
            port: EMAIL.port,
            secure: EMAIL.secure,
            auth: {
                user: EMAIL.user,
                pass: EMAIL.pass,
            },
        });
    }

    /**
     * 
     * @param param0 email：发给对方的邮箱号 subject：标题 html：要发送的html内容
     * 发送验证码的方法
     */
    async send({ email, subject = "LIUERERDER" }) {
        const code = Math.random().toString().slice(-6); // 6位数字
        const options = {
            from: `${EMAIL.alias}<${EMAIL.user}>`,
            to: email,
            subject,
            text: `您好，验证码为：${code}`,
            html: `您好，nng验证码为：${code}`
        };
        this.transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log("邮件发送失败");
                console.log(error);
            } else {
                console.log("邮件发送成功");
                console.log(info);
            }
        });
    }
}