const express = require('express');
const router = express.Router();

const others = require('../controllers/others');

router.route('*').get(others.get);

module.exports = router;