const express = require('express');
const router = express.Router();

const razorpay = require('../controllers/razorpay');

router.route('/razorpay').post(razorpay);

module.exports = router;