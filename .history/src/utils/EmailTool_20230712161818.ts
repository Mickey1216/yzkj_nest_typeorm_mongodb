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

    // 发送验证码的方法
  send({ email, subject = "WEBXUE", html }) {
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

作者：webxue
链接：https://juejin.cn/post/7220725356457164859
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
}