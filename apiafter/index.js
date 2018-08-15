var express = require('express');
var router = express.Router();
var checkToken = require('./middleware/checkToken')

const User = require('./controller/user')
const Product = require('./controller/product')
// const Shopcar = require('./controller/shopcar')


router.post('/login', User.login);
router.get('/user/info', checkToken, User.info);
router.get('/user/info2', checkToken, User.info);
router.get('/msgCode', User.code);

router.get('/product/list', Product.ProductList);
router.get('/product/group', Product.Group);
router.get('/product/detail', Product.Detail);
router.post('/user/address', User.address);
router.get('/user/addresslist', User.AddressList);
/* router.get('/car/add',checkToken, Shopcar.Add);
router.get('/car/list',checkToken, Shopcar.List);
router.post('/car/update',checkToken, Shopcar.Update); */

module.exports = router;
