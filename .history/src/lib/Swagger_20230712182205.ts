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
}