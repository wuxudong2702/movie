const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');
console.log('加载静态文件')
// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles(url, dir) {
    console.log('12');
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        // 判断是否以指定的url开头:
        console.log('请求静态文件开始   路径为：',rpath)

        if (rpath.startsWith(url)) {
            // 获取文件完整路径:
            console.log('文件路径： ',rpath);
           // console.log('11.1')
            let fp = path.join(dir, rpath.substring(url.length));
            // 判断文件是否存在:
           // console.log("fp",fp)
            if (await fs.exists(fp)) {
                console.log('11.2')
                // 查找文件的mime:
                ctx.response.type = mime.lookup(rpath);
                // 读取文件内容并赋值给response.body:
                ctx.response.body = await fs.readFile(fp);
            } else {
                // 文件不存在:
              //  console.log("ctx.1111.body")
                ctx.response.status = 404;
            }
        } else {
            console.log('请求文件路径不以',url,'开头')
            // 不是指定前缀的URL，继续处理下一个middleware:
           // console.log("文件不存在")
            await next();
        }
    };
}

module.exports = staticFiles;