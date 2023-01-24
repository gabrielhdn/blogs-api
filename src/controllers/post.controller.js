const postService = require('../services/post.service');

const create = async (req, res, next) => {
  try {
    const newPost = await postService.create(req.body, req.user);
    res.status(201).json(newPost);
  } catch (e) {
    next(e);
  }
};

const getAll = async (_req, res) => {
  const posts = await postService.getAll();
  res.status(200).json(posts);
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const post = await postService.getOne(id);
    res.status(200).json(post);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedPost = await postService.update(req.body, req.user, id);
    res.status(200).json(updatedPost);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await postService.remove(id, req.user);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const query = async (req, res) => {
    const { q } = req.query;
    let posts;

    if (!q) {
      posts = await postService.getAll();
    } else {
      posts = await postService.query(q.toLowerCase());
    }

    res.status(200).json(posts);
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  query,
};