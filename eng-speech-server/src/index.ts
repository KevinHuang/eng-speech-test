import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';


const app = new Koa();  //create Koa instance
const router = new Router();    //create a router instance

// write an async handler for path "/"
router.post("/", async(ctx, next) => {
    const data = <HelloRequest>ctx.request.body ;
    ctx.body = {name : data.name, intelligence: data.iq} ;

    await next();
});


// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log("Koa started 123 ...");
});

interface HelloRequest {
    name: string,
    iq: number 
}