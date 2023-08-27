const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin');
const checkAuth = require('../middlewares/checkAuth');

router.route('/admin').get(checkAuth, admin.get);

module.exports = router;