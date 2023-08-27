const express = require('express');
const router = express.Router();

const removeFromCart = require('../controllers/removeFromCart');

router.route('/removeFromCart').post(removeFromCart.post);

module.exports = router;