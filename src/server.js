require('cross-fetch/polyfill')
require('dotenv').config()
const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const Router = require('@koa/router')
const hbs = require('koa-views-handlebars')
const { render } = require('../ReactRenderer')

const app = new Koa();

// Serve static assets
app.use(serve(path.resolve(__dirname, '..', 'public')), {
  maxage: process.env.NODE_ENV === 'production' ? 28800000 : 0
});

// Use handlebars templates
app.use(hbs(path.resolve(__dirname, 'templates'), { debug: false }));

const router = new Router();
router.get('/', async (ctx, next) => {
  const data = await render('Root', { name: 'Hello', location: '/', ssr: true });
  await ctx.render('index', data);
});

router.get('/other', async (ctx, next) => {
  const data = await render('Root', { name: 'Other', location: '/other', ssr: true });
  await ctx.render('index', data);
});

router.get('/api', async (ctx, next) => {
  ctx.body = { value: 'Hybrid World!' }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
