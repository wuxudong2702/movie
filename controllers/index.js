
module.exports = {
    'GET /': require('../routers/index'),
    'GET /index': require('../routers/index'),
    "GET /signup": require('../routers/signup'),
    "POST /signup":require('../routers/signupPost') ,
    "GET /signin": require('../routers/signin') ,
    "POST /signin":require('../routers/signinPost') ,
    "GET /movieInfo:movieId": require('../routers/movieInfo') ,
    "POST /movieInfo:movieId": require('../routers/movieInfoBuy') ,
    'GET /user-movieInfo':require('../routers/user-movieInfo'),
    'POST /user-movieInfo':require('../routers/user-movieInfoPost'),
    'GET /signout':require('../routers/signout'),
    'POST /comments:id':require('../routers/comments'),
}