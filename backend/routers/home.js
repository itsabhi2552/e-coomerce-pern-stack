const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const checkAuth = require('../middlewares/checkAuth');

router.route('/home').get(checkAuth, home.get);

module.exports = router;