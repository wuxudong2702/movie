/**
 * Created by wuxudong on 2017/6/23.
 */
module.exports= async (ctx, next) => {
    "use strict";
    console.log("sign ctx.session.errorMessage",ctx.session.errorMessage)
    ctx.render('signin.html', {
        errorMessage:ctx.session.errorMessage
    });
await next();
}

