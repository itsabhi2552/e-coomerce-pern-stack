const express = require('express');
const router = express.Router();

const root = require('../controllers/root');

router.route('/').post(root.post);

module.exports = router;