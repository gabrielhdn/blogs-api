const { Category } = require('../models');

const doCategoriesExist = async (categories) => {
  const validationArr = await Promise.all(categories.map((id) => Category.findOne({
    where: { id },
  })));

  const validCategories = validationArr.reduce((acc, item) => {
    if (item) acc.push(item.id);
    return acc;
  }, []);

  const response = {
    validCategories,
    isDataValid: validationArr.some((item) => item !== null),
  };

  return response;
};

module.exports = {
  doCategoriesExist,
};