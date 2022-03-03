const router = require('koa-router')()
const body = require('koa-body')({ text: false });
const send = require('koa-send');
const fs = require('fs');

async function main(ctx, next) {
    //All dynamic routes start with "/api"
    if (/\/api\//.test(ctx.path)) {
        try {
            await next();
        }
        catch (error) {
            if (error instanceof ApplicationError) {
                console.log(error, { data: error.data, stack: error.stack });
                ctx.status = error.code;
            } else {
                ctx.status = 500;
                console.log(error.message, { stack: error.stack });
            }
        }
        return;
    } else {
        //Not a dynamic route, serve static content
        if ((ctx.path != "/") && (fs.existsSync('dist' + ctx.path))) {
            await send(ctx, 'dist' + ctx.path);
        } else {
            await send(ctx, 'dist/index.html');
        }
    }
}

module.exports = app => {
    app.use(main);
    app.use(router.routes());
};