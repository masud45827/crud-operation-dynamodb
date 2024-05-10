const Router = require('koa-router');
const Koa = require('koa');
const { getController, postController, updateController, deleteController, } = require('../controllers/userController');
const router = new Router();
const app = new Koa();

router.post('/', postController);
router.get('/:id', getController);
router.put('/',updateController);
router.delete('/:id',deleteController);

module.exports = router.routes();