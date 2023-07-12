export default {
    EMAIL: {
        // 邮箱别名，自己定义
        alias: "// 发送验证码的方法
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
      著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。",
        // 邮件服务器地址
        host: "smtp.163.com",
        // 邮件服务器端口
        port: 465,
        // 是否使用默认465端口
        secure: true,
        // 你的邮箱
        user: "18181599195@163.com",
        // 你的授权码
        pass: "KDLSALASUDRMAXSI",
    }
}