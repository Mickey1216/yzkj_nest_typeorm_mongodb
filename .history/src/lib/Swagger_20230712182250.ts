export class Swagger {
    // app：指的是Module，需要把这个Swagger挂载在哪个Module下。必须传入
    private app = null;
    // title：文档标题。可选
    private title = "API文档";
    // description：文档描述。可选
    private description = "webxue的API文档";
    // version：文档版本。可选
    private version = "1.0";
    // url：文档生成的地址。可选
    private url = "/doc";

    constructor(option) { 
        this.app = option.app;
        if (option.title) this.title = option.title;
        if (option.description) this.description = option.description;
        if (option.version) this.version = option.version;
        if (option.url) this.url = option.url;
    }

    build() {
        const swaggerOptions = new DocumentBuilder()
          .setTitle(this.title)
          .setDescription(this.description)
          .setVersion(this.version)
          .addBearerAuth()
          .build();
        const document = SwaggerModule.createDocument(this.app, swaggerOptions);
        SwaggerModule.setup(this.url, this.app, document);
      }
      
      作者：webxue
      链接：https://juejin.cn/post/7221868323104571429
      来源：稀土掘金
      著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
}