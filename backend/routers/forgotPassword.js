const express = require('express');
const router = express.Router();

const userExits = require('../middlewares/userExits');
const forgotPassword = require('../controllers/forgotPassword');

router.route('/forgotPassword').get(forgotPassword.get).post(userExits, forgotPassword.post);

module.exports = router;