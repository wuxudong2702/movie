/**
 * Created by wuxudong on 2017/6/23.
 */
module.exports= async (ctx, next) => {
    "use strict";
    ctx.render('signup.html',{
        errorMessage:ctx.session.errorMessage
    });
    await next();
}