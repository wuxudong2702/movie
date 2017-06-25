/**
 * Created by wuxudong on 2017/6/23.
 */
const { query }=require('../middlewares/mysql');
module.exports=
    async (ctx, next) => {
    var user_name = ctx.request.body.name;
    var password = ctx.request.body.password;
    let sql='select * from users where user_name=?';
    let userInfo=await query(sql,user_name);
    if(userInfo[0]){
        if(userInfo[0] && userInfo[0].password==password) {
            ctx.session={
                successMessage:'',
                errorMessage:'',
                user_name:user_name
            }
            ctx.redirect('/');
        }else{
            ctx.session={
                // successMessage:'',
                errorMessage:'密码不对。',
                user_name:''
            };
            console.log("errorMessage")
            ctx.redirect('/signin')
        }
    }else {
        ctx.session={
            successMessage:'',
            errorMessage:'未找到该用户，先注册吧。',
            user_name:''
        };
        ctx.redirect('/signup');
    }
    console.log("userInfo", userInfo);
    await next();
}





