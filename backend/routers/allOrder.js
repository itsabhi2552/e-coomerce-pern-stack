const express = require('express');
const router = express.Router();

const allOrder = require('../controllers/allOrder');
const checkAuth = require('../middlewares/checkAuth');

router.route('/allOrder').post(allOrder.post);

module.exports = router;