# movie
### 技术栈
* koa框架<br>
* mysql数据库<br>
* nunjucks模板引擎<br>
* bootstrip框架
 
## 功能展示
### 网上电影购票系统
##### 登录界面<br>
如下图所示，登陆时有验证用户名是否为空、重复、密码输入是否正确。如果用户没注册，可直接点击注册进入注册界面<br><br>
![](https://github.com/wuxudong2702/movie/blob/master/img-gif/signin.gif)<br>
##### 注册界面<br>
用户名作为数据库中的主键，用户注册时检查是否重复，还需要对电话号码、密码长度、以及密码是否相等做验证。<br><br>
![](https://github.com/wuxudong2702/movie/blob/master/img-gif/index-signup.gif)<br>
##### 查询界面<br>
支持用户对电影名称的模糊查询<br><br> 
![](https://github.com/wuxudong2702/movie/blob/master/img-gif/csearch.gif)<br>
##### 购买界面<br>
用户可选择座位号，电影院，时间。座位号与电影院现在还不对应，时间还没有范围，不过现在座位号可以不重复的选择了。购买电影票如下图所示。<br><br>
![](https://github.com/wuxudong2702/movie/blob/master/img-gif/buy.gif)<br>
##### 评论界面<br><br>
![](https://github.com/wuxudong2702/movie/blob/master/img-gif/comment.gif)<br>
##### 删除订单<br><br>
![](https://github.com/wuxudong2702/movie/blob/master/img-gif/remove.gif)<br>
