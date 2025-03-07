const express = require('express');
const router = express.Router();
const categoryController = require('../controller/CategoryController');
const auth = require('../authmiddleware/auth');

router.get('/all', auth, categoryController.getAll);

module.exports = router;
