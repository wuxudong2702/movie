/**
 * Created by wuxudong on 2017/6/23.
 */
const formatDateTime=require('../middlewares/timeHandle');
const { query }=require('../middlewares/mysql');
module.exports=  async (ctx, next) => {
    if(ctx.session.user_name) {
        let sql = 'select * from user_movie where user_name=?';
        let results_order = await query(sql, ctx.session.user_name);
        for(let i=0;i<results_order.length;i++){
            results_order[i].time=formatDateTime(results_order[i].date);
        }
        var successMessage=ctx.session.successMessage;
        ctx.render('usre-movieInfo.html', {
            results_order: results_order,
            successMessage:successMessage,
        });
    }else{
        console.log("eooor",ctx.session);
        ctx.redirect('/signin');
    }
    console.log("21.3");
    await next();
}


