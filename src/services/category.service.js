const { Category } = require('../models');

const create = async (name) => {
  if (!name) {
    const err = { status: 400, message: '"name" is required' };
    throw err;
  }

  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};