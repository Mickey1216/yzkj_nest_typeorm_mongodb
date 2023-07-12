import * as nodemail from "nodemailer";
import EMAIL from '../config/email';


export class Email {
    private transporter = null;
    
    constructor(){
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

作者：webxue
链接：https://juejin.cn/post/7220725356457164859
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    }
  }