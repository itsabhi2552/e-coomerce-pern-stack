const express = require('express');
const router = express.Router();

const products = require('../controllers/products');

router.route('/products').post(products.post);

module.exports = router;