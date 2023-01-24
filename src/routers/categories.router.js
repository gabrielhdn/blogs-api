const express = require('express');
const jwt = require('../middlewares/jwt.middleware');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.get('/', jwt, categoryController.getAll);
router.post('/', jwt, categoryController.create);

module.exports = router;