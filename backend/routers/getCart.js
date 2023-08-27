const express = require('express');
const router = express.Router();

const getCart = require('../controllers/getCart');
// const checkAuth = require('../middlewares/checkAuth');

router.route('/getCart').post(getCart.post);

module.exports = router;