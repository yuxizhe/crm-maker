const Koa = require('koa');
const path = require('path');
const staticCache = require('koa-static-cache');


const app = new Koa();

app.use(staticCache(path.join(__dirname, 'build'), {
  prefix: '/crm-maker/'
}));

app.listen(process.env.PORT || 7878, () => {
  console.log(
    'Koa server listening on %d',
    process.env.PORT || 7878,
  );
});