const nunjucks = require('nunjucks');
console.log('22')
function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        // console.log('23')
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}
function templating(path, opts) {
    // console.log('24')
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // console.log("2134567890908765432456789008765432")
        ctx.render = function (view, model) {
            // console.log('25');
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
            // console.log('22.1')
        };
        // console.log("_________________________________________________________________________________")
        await next();
    };
}
module.exports = templating;