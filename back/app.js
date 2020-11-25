var Koa = require('koa');
var Router = require('koa-router');
var views = require('koa-views');
//var common = require('./module/common');
var bodyParser = require("koa-bodyparser"); //获取post表单
var static = require("koa-static");
var path = require('path');
var render = require('koa-art-template');
var cors = require('koa2-cors');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/new";

var DB =require("./module/db");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));    //延时函数

MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
});


var app = new Koa();

render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'    //是否开启调试模式
});
var router = new Router();

app.use(bodyParser());

app.use(static('static'));

app.use(cors());    //解决前后端数据跨域问题

//中间件
app.use(async (ctx,next)=>{
    console.log(ctx.url+" "+new Date());
    await next();

    if(ctx.status==404)
    {
        ctx.body="这是一个404界面";
    }
    else
    {
        console.log(ctx.url);
    }
})



//配置路由
router.get('/', async (ctx) => {
    // ctx.router available
    //ctx.body="首页";
    // let title = "你好ejs";
    // await  ctx.render("index",{
    //
    // });
    await ctx.render('index');
    console.log("首页");
});

router.get('/register',async (ctx)=>{
    //ctx.body="这是一个注册页面";
    await ctx.render('register');
});

router.get('/home',async (ctx)=>{
    //ctx.body="这是一个主页面";
    await ctx.render('home');
});

// router.get('/login',async (ctx)=>{
//     var user = ctx.query;
//     console.log(user);
//     //ctx.body="登陆中。。。";
//     ctx.response.body = '111';
// });


router.post('/doAdd',async (ctx)=>{


    // console.log(ctx.request.body);
    // console.log(typeof ctx.request.body);
    var user=ctx.request.body;
    var finduser={
        username:user.username,
        password:user.password
    };
    //console.log(finduser);
    ctx.body=user;

    var result = await DB.count('user',finduser);
    await cors();
    if(result>0)
    {
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body="此用户已被注册过";
    }
    else
    {
        var utemp = await DB.insert('user',user);
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body = "注册成功";
        // await delay(1000);
        // ctx.redirect("/login");   //跳转地址
    }

    console.log(result);




});

router.post('/doLogin',async (ctx)=>{

    let user = ctx.request.body;
    console.log(user);

    var result = await DB.find('user',user);

    await cors();

    if(result.length>0)
    {
       // await ctx.render('home');
        //console.log(result[0].location)
        ctx.body = result[0];
    }
    else
    {
        ctx.body = "账号密码不匹配，请重新登录";
    }
    console.log(result);

});



router.get('/login',async (ctx)=>{

    // ctx.type = 'text/html;charset=utf-8';
    //ctx.body="这是一个登录页面";
    await ctx.render('login');
});

router.get('/insertform',async (ctx)=>{

   //  let user = {"id":1};
   // console.log(user);

    var result = await DB.findIdMax('form');

    await cors();

    ctx.body="这是一个编辑页面";
    console.log("结果是"+JSON.stringify(result[0]));

});

router.post('/insertform',async (ctx)=>{


    // console.log(ctx.request.body);
    // console.log(typeof ctx.request.body);
    var user=ctx.request.body;
    var finduser={
        id:user.id
    };
    //console.log(finduser);
    ctx.body=user;

    var result = await DB.count('form',finduser);
    await cors();
    if(result>0)
    {
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body="此表单编号已被占用";
    }
    else
    {
        var utemp = await DB.insert('form',user);
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body = "提交成功";
        // await delay(1000);
        // ctx.redirect("/login");   //跳转地址
    }

    console.log(result);




});

router.post('/updataform',async (ctx)=>{


    // console.log(ctx.request.body);
    // console.log(typeof ctx.request.body);
    var user=ctx.request.body;
    var finduser={
        id:user.id
    };
    console.log(finduser);
    console.log(user);
    //ctx.body=user;
    var result = await DB.find('form',finduser);
    console.log(result);
    await cors();
    if(result==0)
    {
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body="此表单编号已被占用";
    }
    else
    {
        var utemp1 = await DB.updata('form',result[0],user);
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body = "提交成功";
        // await delay(1000);
        // ctx.redirect("/login");   //跳转地址
    }

    console.log(result);




});

router.post('/getform',async (ctx)=>{

    // console.log(ctx.request.body);
    // console.log(typeof ctx.request.body);
    var user=ctx.request.body;
    var finduser={
        username:user.username
    };
    //console.log(finduser);


    var result = await DB.count('form',finduser);

    await cors();
    if(result>0)
    {
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body=await DB.find('form',finduser);
    }
    else
    {

        ctx.body = "没有表单记录";
        // await delay(1000);
        // ctx.redirect("/login");   //跳转地址
    }

    console.log(result);

});

router.post('/getformbystatus',async (ctx)=>{

    // console.log(ctx.request.body);
    // console.log(typeof ctx.request.body);
    var user=ctx.request.body;
    var finduser={
        status:user.status
    };
    //console.log(finduser);


    var result = await DB.count('form',finduser);

    await cors();
    if(result>0)
    {
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body=await DB.find('form',finduser);
    }
    else
    {

        ctx.body = "没有表单记录";
        // await delay(1000);
        // ctx.redirect("/login");   //跳转地址
    }

    console.log(result);

});

router.post('/getformbyid',async (ctx)=>{

    // console.log(ctx.request.body);
    // console.log(typeof ctx.request.body);
    var user=ctx.request.body;
    var finduser={
        id:user.id
    };
    //console.log(finduser);


    var result = await DB.count('form',finduser);

    await cors();
    if(result>0)
    {
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body=await DB.find('form',finduser);
    }
    else
    {

        ctx.body = "没有表单记录";
        // await delay(1000);
        // ctx.redirect("/login");   //跳转地址
    }

    console.log(result);

});

router.post('/getformbyservicename',async (ctx)=>{

    // console.log(ctx.request.body);
    // console.log(typeof ctx.request.body);
    var user=ctx.request.body;
    var finduser={
        csname:user.csname
    };
    //console.log(finduser);


    var result = await DB.count('form',finduser);

    await cors();
    if(result>0)
    {
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body=await DB.find('form',finduser);
    }
    else
    {

        ctx.body = "没有表单记录";
        // await delay(1000);
        // ctx.redirect("/login");   //跳转地址
    }

    console.log(result);

});

router.post('/getformbyproname',async (ctx)=>{

    // console.log(ctx.request.body);
    // console.log(typeof ctx.request.body);
    var user=ctx.request.body;
    var finduser={
        tsname:user.tsname
    };
    //console.log(finduser);


    var result = await DB.count('form',finduser);

    await cors();
    if(result>0)
    {
        //ctx.type = 'text/html;charset=utf-8';
        ctx.body=await DB.find('form',finduser);
    }
    else
    {

        ctx.body = "没有表单记录";
        // await delay(1000);
        // ctx.redirect("/login");   //跳转地址
    }

    console.log(result);

});

router.get('/edit',async (ctx)=>{

    // ctx.type = 'text/html;charset=utf-8';
    let result = await DB.updata('user',{"name":"李四"},{"name":"李无"});
    console.log(result);
    ctx.body="这是一个编辑页面";

});

router.get('/delete',async (ctx)=>{

    // ctx.type = 'text/html;charset=utf-8';
    let result = await DB.remove('user',{"name":"李无"});
    console.log(result);
    ctx.body="这是一个删除页面";

});


//启动路由
app
    .use(router.routes())
    .use(router.allowedMethods());      //可选 建议配置

app.listen(3000);