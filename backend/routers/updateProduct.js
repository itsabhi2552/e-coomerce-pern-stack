const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

const adminAuth = require('../middlewares/adminAuth');
const updateProduct = require('../controllers/updateProduct');

router.route('/updateProduct').post(upload.single('image'), updateProduct.post);

module.exports = router;