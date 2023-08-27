const express = require('express');
const router = express.Router();

const logout = require('../controllers/logout');
const checkAuth = require('../middlewares/checkAuth');

router.route('/logout').get(checkAuth, logout.get);

module.exports = router;