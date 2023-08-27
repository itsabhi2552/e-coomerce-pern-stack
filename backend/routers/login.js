const express = require('express');
const router = express.Router();

const login = require('../controllers/login');
const userExits = require('../middlewares/userExits');

router.route('/login').post(userExits, login.post);

module.exports = router;