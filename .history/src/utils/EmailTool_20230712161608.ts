import * as nodemail from "nodemailer";
import {EMAIL} from '../config/email';


export class Email {
    private transporter = null;

    constructor() {
        // 通过nodemail的createTransport方法创建这个服务，将config中的参数依次传入
        this.transporter = nodemail.createTransport({
            host: EMAIL.EMAIL.host,
            port: EMAIL.port,
            secure: EMAIL.secure,
            auth: {
                user: EMAIL.user,
                pass: EMAIL.pass,
            },
        });

    }
}