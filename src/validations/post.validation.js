const postSchema = require('../schemas/post.schema');

const validatePostSchema = (info, type) => {
  const { error } = postSchema[type].validate(info);

  if (error) {
    return { status: 400, message: error.message };
  }

  return null;
};

module.exports = {
  validatePostSchema,
};