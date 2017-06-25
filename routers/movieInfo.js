/**
 * Created by wuxudong on 2017/6/23.
 */
const formatDateTime=require('../middlewares/timeHandle');
const { query }=require('../middlewares/mysql');
module.exports=  async (ctx, next) => {
    "use strict";

    let sql='select * from movieInfo where id=?';
    let results=await query(sql,ctx.request.url.slice(11, 12));
    console.log("results movieInfo get ",results)
    console.log("ctx.request.url movieInfo get ",ctx.request.url)
    // for (var i = 0; i < results.length; i++) {
    //     if (results[i].id == ctx.request.url.slice(11, 12)) {//找到用户点击的电影，智能是一个
    //         resultmovie = results[i];
    //     }
    // }
    // console.log("resultmovie movieInfo get ",resultmovie)
    var time = formatDateTime(results[0].time);
    let sql1 = 'select * from comments where movie_id=? order by id desc';
    var commentResult = await query(sql1, results[0].id);


    let sqlSeat='select seat_num from user_movie where movie_name=?';
    let seat=await query(sqlSeat,results[0].name);
    // console.log("seat",seat)
    // console.log("results[0].name",results[0].name)
    var seats=[];
       for(let i=0;i<501;i++){
          seats[i]=i;
       }
       for(let i=0;i<seat.length;i++){
          var index= seats.indexOf(seat[i].seat_num);
           if(index>-1){
               seats.splice(index,1);
           }
       }
    console.log("seat",seats)
    ctx.render('movieInfo.html', {
        movie: results[0],
        time: time,
        seats:seats,
        commentResult:commentResult,
        successMessage:ctx.session.successMessage,
        errorMessage:ctx.session.errorMessage
    });
    var user_name=ctx.session.user_name;
    ctx.session={
        successMessage:'',
        user_name:user_name,
        errorMessage:''
    }
    await next();
}