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

作者：webxue
链接：https://juejin.cn/post/7221868323104571429
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    }
}