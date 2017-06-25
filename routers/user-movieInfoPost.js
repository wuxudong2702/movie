/**
 * Created by wuxudong on 2017/6/23.
 */
const { query }=require('../middlewares/mysql');
module.exports=  async (ctx, next) => {
    if(ctx.session.user_name && ctx.request.body){
        var movie_id=ctx.request.body.movie_id.slice(4);
        movie_id= parseInt(movie_id);
        var user_name=ctx.session.user_name;
        let sq3='select * from user_movie where user_name=? and id=?';
        let sqlq=[user_name,movie_id];
        let Id=await query(sq3,sqlq);
        if(Id[0].watched==='已看过'){
            console.log("Id",Id[0].watched);
            ctx.session.errorMessage='';
            ctx.session.successMessage='删除成功。';
        }else {
            ctx.session.errorMessage = '';
            ctx.session.successMessage = '退票成功，您的钱已返还。';
        }
        var array=[];
        for(let i=0;i<Id.length;i++){
            console.log(Id[i].id)
            array.push(Id[i].id)
        }
        var minId=Math.min.apply(Math,array);
        let sql='delete from user_movie where id=?';
        let sql1=[minId];
        let results=await query(sql,sql1);
        ctx.redirect('/user-movieInfo')
    }else{
        ctx.redirect('/',{
            errorMessage:'系统错误。'
        });
    }
    await next();
}

