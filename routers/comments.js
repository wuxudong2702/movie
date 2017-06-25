/**
 * Created by wuxudong on 2017/6/23.
 */

const { query }=require('../middlewares/mysql');
module.exports=  async (ctx, next) => {
    "use strict";
        var user_name= ctx.session.user_name;
        if(user_name) {
            var movie_id = ctx.request.url.slice(9);
            // console.log("ctx.request.url",ctx.request.url);
            // console.log("movie_id",movie_id);
            // console.log("ctx.request.body",ctx.request.body);
            var comment = ctx.request.body.comment.trim();
                if (comment) {
                    // ctx.request.body.comment=ctx.request.body.comment.trim();

                    var comments = {
                        user_name: user_name,
                        movie_id: movie_id,
                        comments: comment
                    };
                    // console.log("comments",comments);
                    let sql = 'insert into comments set ?';
                    let results = await query(sql, comments);
                    ctx.request.body.bought = '';
                    ctx.session = {
                        successMessage: '',
                        user_name: user_name,
                        errorMessage: ''
                    }
                    ctx.redirect('/movieInfo:' + movie_id)
                } else {
                    ctx.session = {
                        successMessage: '',
                        user_name: user_name,
                        errorMessage: '内容不能为空。'
                    }
                    ctx.redirect('/movieInfo:' + movie_id);
                }
            }
            else{
            ctx.session.errorMessage='请先登录'
                ctx.redirect('/signin:');
            }


    await next();
}