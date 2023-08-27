const express = require('express');
const router = express.Router();

const updateOrder = require('../controllers/updateOrder');

router.route('/updateOrder').post(updateOrder.post);

module.exports = router;