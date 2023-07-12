export class Swagger {
    // app：指的是Module，需要把这个Swagger挂载在哪个Module下
    private app = null;
    // title：文档标题
    private title = "API文档";
    // description：文档描述
    private description = "webxue的API文档";
    // version：文档版本
    private version = "1.0";
    // url：文档生成的地址
    private url = "/doc";

    constructor(options) { 
        this.app = option.app;
    if (option.title) this.title = option.title;
    if (option.description) this.description = option.description;
    if (option.version) this.version = option.version;
    if (option.url) this.url = option.url;
    }
}