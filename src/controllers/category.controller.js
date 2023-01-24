const categoryService = require('../services/category.service');

const create = async (req, res, next) => {
  try {
    const newCategory = await categoryService.create(req.body.name);
    res.status(201).json(newCategory);
  } catch (e) {
    next(e);
  }
};

const getAll = async (_req, res) => {
  const categories = await categoryService.getAll();
  res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};