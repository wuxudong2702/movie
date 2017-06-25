/**
 * Created by wuxudong on 2017/6/23.
 */

const { query }=require('../middlewares/mysql');
module.exports=  async (ctx, next) => {
    "use strict";
    console.log("ctx.request.body",ctx.request.body);
        var user_name= ctx.session.user_name;




        if(user_name) {
            var movie_id = ctx.request.url.slice(11, 12);
            if (ctx.request.body) {
                // ctx.request.body.comment=ctx.request.body.comment.trim();
                // ctx.request.body.comment='';
                var moviePlace=ctx.request.body.moviePlace;
                var movieImg=ctx.request.body.movieImg
                var timeSelect =ctx.request.body.timeSelect;
                var movieName=ctx.request.body.movieName;
                var seatNum=ctx.request.body.seatNum;
                var user_movie = {
                    user_name:user_name,
                    date: timeSelect,
                    watched: '没看过',
                    place:moviePlace,
                    movie_img:movieImg,
                    movie_name:movieName,
                    seat_num:seatNum,
                }
                let sql='insert into user_movie set ?';
                let results=await query(sql,user_movie);
                ctx.session={
                    successMessage:'刚刚武旭东偷偷划了您的钱，并给了您一张假电影票。',
                    user_name:user_name,
                    errorMessage:''
                }
                ctx.redirect('/movieInfo:' + movie_id);
            }

        }else{
            ctx.session={
                successMessage:'',
                user_name:'',
                errorMessage:'请先登录。'
            }
            // console.log("ctx.session.user-name", ctx.session.user_name);
            ctx.redirect('/signin');
        }

    await next();
}