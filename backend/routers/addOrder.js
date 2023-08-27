const express = require('express');
const router = express.Router();

const addOrder = require('../controllers/addOrder');

router.route('/addOrder').post(addOrder.post);

module.exports = router;