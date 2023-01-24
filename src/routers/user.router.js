const express = require('express');
const userController = require('../controllers/user.controller');
const jwt = require('../middlewares/jwt.middleware');

const router = express.Router();

router.get('/', jwt, userController.getAll);
router.get('/:id', jwt, userController.getOne);
router.post('/', userController.create);
router.delete('/me', jwt, userController.remove);

module.exports = router;