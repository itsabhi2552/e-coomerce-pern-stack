const express = require('express');
const router = express.Router();

const getUser = require('../controllers/getUser');

router.route('/getUser').post(getUser.post);

module.exports = router;