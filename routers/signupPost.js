/**
 * Created by wuxudong on 2017/6/23.
 */
const { query }=require('../middlewares/mysql');
module.exports=async (ctx, next) => {
    "use strict";
    var name = ctx.request.body.name;
    var tel = ctx.request.body.tel;
    var password = ctx.request.body.password;
    var repassword = ctx.request.body.repassword;
    try {
        if (name.length > 50 || name.length < 1) {
            throw new Error('用户名不能为空！')
        }
        if (tel.length < 7 || tel.length > 11) {
            throw new Error('请输入正确的电话号码！')
        }
        if (password.length < 6) {
            throw new Error('密码长度应大于6为。')
        }
        if (password !== repassword) {
            throw new Error('两次密码输入不一致。')
        }
        let sql='select * from users';

        let results=await query(sql);
        for (let i = 0; i < results.length; i++) {
            if (results[i].user_name === name) {
                throw new Error('改用户名已注册，咱还是换个别的吧。')
            }
        }
    } catch (e) {
        console.log("error3333", e.message);
        ctx.session={
            successMessage:'',
            errorMessage:e.message,
            user_name:''
        }
        return ctx.redirect('/signup');
    }
    var user = {
        user_tel: tel,
        user_name: name,
        password: password
    };
    let sql='insert into users set ?';
    let userResult=await query(sql,user);
    ctx.session={
        successMessage:'',
        errorMessage:'',
        user_name:user.user_name
    }
    ctx.redirect('/');
    await next();
}