/**
 * Created by wuxudong on 2017/6/23.
 */
const { query }=require('../middlewares/mysql');
module.exports= async (ctx, next)=>{
    var searchDate = ctx.query;
    ctx.session.errorMessage = '';
    ctx.session.successMessage = '';
    let sql = 'select * from movieInfo';
    let results = await query(sql);
    var resultSearch = [];
    if (searchDate.searchDate) {
        for (let i = 0; i < results.length; i++) {
            if (results[i].name.indexOf(searchDate.searchDate) > -1) {
                resultSearch.push(results[i]);
            }
        }
    } else {
        resultSearch = results;
    }
    console.log("开始render ");
    ctx.render('index.html', {
        result: resultSearch,
        user_name: ctx.session.user_name,
    });
    console.log("render结束 ");
    await
    next();
}
