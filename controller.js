const fs = require('fs');
// add url-route in /controllers:
console.log('14')
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            console.log("path controller.js Get开头",path);
            router.get(path, mapping[url]);
          //  console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {

            var path = url.substring(5);
            console.log("path controller.js Post开头",path);
            router.post(path, mapping[url]);
           // console.log(`register URL mapping: POST ${path}`);
        }
        else {
           console.log('不合法的路径~~~~~___________-----___-------____--------____------',url);
        }
    }
}
function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        console.log('添加controller，读取每一个js文件名称')
        return f.endsWith('.js');
    }).forEach((f) => {
        // console.log('获取每一个js文件')
        // console.log('f文件',f);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        // console.log('mapping',mapping);
        // console.log('18')
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
     //  console.log("controllers_dir",controllers_dir);
    console.log('执行controller函数')
    addControllers(router, controllers_dir);
    console.log('20')
    return router.routes();

};


//
// module.exports=function(){
//     "use strict";
//
// }

