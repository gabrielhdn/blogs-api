const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory, User, Category } = require('../models');
const { doCategoriesExist } = require('../validations/category.validation');
const { validatePostSchema } = require('../validations/post.validation');

const env = 'development';
const sequelize = new Sequelize(config[env]);

const findPost = async (id) => BlogPost.findOne({ where: { id } });

const createTransaction = async ({ validCategories, title, content, userId }) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create(
        { title, content, userId },
        { transaction: t },
      );
      
      const bulkArr = validCategories.map((categoryId) => ({ postId: newPost.id, categoryId }));
      await PostCategory.bulkCreate(bulkArr, { transaction: t });

      return newPost;
    });

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const create = async (body, userId) => {
  const { title, content, categoryIds } = body;
  const error = validatePostSchema(body, 'createPostSchema');

  if (error) throw error;

  const { validCategories, isDataValid } = await doCategoriesExist(categoryIds);

  if (!isDataValid) {
    const err = { status: 400, message: '"categoryIds" not found' };
    throw err;
  }

  try {
    const newPost = await createTransaction({ validCategories, title, content, userId });
    return newPost;
  } catch (e) {
    throw e.message;
  }
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getOne = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    const err = { status: 404, message: 'Post does not exist' };
    throw err;
  }

  return post;
};

const update = async (body, user, id) => {
  const { title, content } = body;
  const { userId } = await findPost(id);
  const error = validatePostSchema(body, 'updatePostSchema');

  if (error) throw error;

  if (user !== userId) {
    const err = { status: 401, message: 'Unauthorized user' };
    throw err;
  }

  await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  const updated = await getOne(id);
  return updated;
};

const remove = async (id, user) => {
  const postToDelete = await findPost(id);

  if (!postToDelete) {
    const err = { status: 404, message: 'Post does not exist' };
    throw err;
  }

  if (user !== postToDelete.userId) {
    const err = { status: 401, message: 'Unauthorized user' };
    throw err;
  }

  await BlogPost.destroy({ where: { id } });
};

const query = async (q) => {
  const text = `%${q}%`;

  const posts = BlogPost.findAll({
    where: {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: text } },
        { content: { [Sequelize.Op.like]: text } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!posts) return [];
  return posts;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  query,
};