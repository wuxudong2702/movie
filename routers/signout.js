/**
 * Created by wuxudong on 2017/6/23.
 */
const { query }=require('../middlewares/mysql');
module.exports=    async (ctx, next) => {
    let sql='select * from movieInfo';
    let results=await query(sql);
    ctx.session.user_name='',
        ctx.session.successMessage='';
    ctx.render('index.html', {
        result: results,
        user_name: ctx.session.user_name,
        successMessage:ctx.session.successMessage
    });
    await next();
}