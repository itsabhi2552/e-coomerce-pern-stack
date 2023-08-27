const express = require('express');
const router = express.Router();

const signup = require('../controllers/signup');
const checkAuth = require('../middlewares/checkAuth');
const userExits = require('../middlewares/userExits');

router.route('/signup').get(checkAuth, signup.get).post(userExits, signup.post);

module.exports = router;