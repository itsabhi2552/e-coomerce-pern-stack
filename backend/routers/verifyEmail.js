const express = require('express');
const router = express.Router();

const verifyEmail = require('../controllers/verifyEmail');

router.route('/verifyEmail/:id').get(verifyEmail.get);

module.exports = router;