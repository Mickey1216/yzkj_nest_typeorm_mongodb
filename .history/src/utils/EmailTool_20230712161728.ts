import * as nodemail from "nodemailer";
import email from '../config/email';


export class Email {
    private transporter = null;

    constructor() {
        // 通过nodemail的createTransport方法创建这个服务，将config中的参数依次传入
        this.transporter = nodemail.createTransport({
            host: email.EMAIL.host,
            port: email.EMAIL.port,
            secure: email.EMAIL.secure,
            auth: {
                user: email.EMAIL.user,
                pass: email.EMAIL.pass,
            },
        });

    }
}