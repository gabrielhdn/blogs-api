const express = require('express');
const jwt = require('../middlewares/jwt.middleware');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.get('/', jwt, postController.getAll);
router.get('/search', jwt, postController.query);
router.get('/:id', jwt, postController.getOne);
router.post('/', jwt, postController.create);
router.put('/:id', jwt, postController.update);
router.delete('/:id', jwt, postController.remove);

module.exports = router;