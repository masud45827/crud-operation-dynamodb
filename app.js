const Koa =require('koa');
const dotenv = require('dotenv');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const usersRoutes = require('./routes/userRoutes');

dotenv.config();
const app = new Koa();
const port  = process.env.PORT;
router = new Router();
app.use(bodyParser());

router.use('/users',usersRoutes);

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000,()=>{
    console.log(`running port ${port}`);
})