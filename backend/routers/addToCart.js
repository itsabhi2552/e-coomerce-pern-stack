const express = require('express');
const router = express.Router();

const addToCart = require('../controllers/addToCart');

router.route('/addToCart').post(addToCart.post);

module.exports = router;