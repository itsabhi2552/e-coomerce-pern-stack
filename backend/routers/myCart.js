const express = require('express');
const router = express.Router();

const myCart = require('../controllers/myCart');
const checkAuth = require('../middlewares/checkAuth');

router.route('/myCart').get(checkAuth, myCart.get);

module.exports = router;