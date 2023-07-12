export class Swagger {
    // app：指的是Module，需要把这个Swagger挂载在哪个Module下
    private app = null;
    // title：文档标题
    private title = "API文档";
    // 
    private description = "webxue的API文档";
    private version = "1.0";
    private url = "/doc";

    constructor() { }
}