const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koaRouter = require("koa-router");
const winstonKoaLogger = require("winston-koa2-logger");
const { graphqlKoa } = require("apollo-server-koa");
const apolloSchema = require("./apollo-gql-schema");
const log = require("./log");

const routerRoot = new koaRouter();
routerRoot.post("/graphql", (ctx, next) => graphqlKoa({schema: apolloSchema, context: ctx.state})(ctx, next));

const app = new koa();
//app.use(winstonKoaLogger(log))
app.use(bodyParser());
app.use(routerRoot.routes());
app.use(routerRoot.allowedMethods());

module.exports = app;
