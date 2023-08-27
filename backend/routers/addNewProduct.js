const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads' });

const adminAuth = require('../middlewares/adminAuth');
const addNewProduct = require('../controllers/addNewProduct');

router.route('/addNewProduct').post(upload.single('image'), addNewProduct.post);

module.exports = router;