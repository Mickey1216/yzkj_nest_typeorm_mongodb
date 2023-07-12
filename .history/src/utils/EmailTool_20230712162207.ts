import * as nodemail from "nodemailer";
import { EMAIL } from '../config/email';

export class Email {
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
     * @param param0 
     */
    send({ email, subject = "LIUERERDER", html }) {
        const code = Math.random().toString().slice(-6);
        const options = {
        from: `${EMAIL.alias}<${EMAIL.user}>`,
        to: email,
        subject,
        text: `验证码为${code}`,
        html,
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