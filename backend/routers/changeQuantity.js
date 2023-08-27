const express = require('express');
const router = express.Router();

const changeQuantity = require('../controllers/changeQuantity');

router.route('/changeQuantity').post(changeQuantity.post);

module.exports = router;