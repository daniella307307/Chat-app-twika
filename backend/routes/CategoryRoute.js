const express = require('express');
const router = express.Router();
const categoryController  = require('../controller/CategoryController')
const auth = require('../authmiddleware/auth');
router.get('/',auth,categoryController.getAll);