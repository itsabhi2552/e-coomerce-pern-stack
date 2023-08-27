const express = require('express');
const router = express.Router();

const myOrder = require('../controllers/myOrder');
const checkAuth = require('../middlewares/checkAuth');

router.route('/myOrder').post(myOrder.post);

module.exports = router;