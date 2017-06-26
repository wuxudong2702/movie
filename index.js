const Koa = require('koa');
var session=require('koa-session-minimal');
var MysqlSession=require('koa-mysql-session');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');
let store=new MysqlSession({
    user:'root',
    password:'',
    database:'localhost',
    host:'127.0.0.1',
});
let cookie={
    maxAge:60*60*24*30,
    overwrite:true,

};
console.log('以上中间件加载完毕');
const app = new Koa();

app.use(session({
    key:'movie',
    store: store,
    cookie:cookie,
    secret:'movie1',
    resave: false,
    saveUninitialized: true
}));

app.use(async (ctx, next) => {
    console.log('测量时间的async函数');
    var
        start = new Date().getTime(),
        execTime;
    await next();
   execTime = new Date().getTime() - start;
    console.log('测量时间的async函数执行完毕。反应时间是',execTime);
});
console.log('继续执行1')
// static file support:
// if (! isProduction) {
let staticFiles = require('./middlewares/static');
console.log("staticfiles_静态文件加载完毕")
app.use(staticFiles('/static/', __dirname + '/static'));//async函数
// }
console.log("staticfiles_静态文件使用完毕")
console.log('马上要解析了，bodyParser');
app.use(bodyParser({
    formidable:{uploadDir: './uploads'},
    multipart: true,
    urlencoded: true
}));
console.log("body解析完毕")
// add nunjucks as view:
console.log("使用模板，template")
app.use(templating('views', {//async/  /async函数
    noCache: false,
    watch: true
}));
console.log("模板，template使用完毕")

// add controller:
console.log("开始使用控制器")
app.use(controller());//async函数
console.log("控制器使用完毕")

app.listen(3000);
console.log('—————————————app started at port 3000...');


