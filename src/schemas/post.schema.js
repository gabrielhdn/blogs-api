const Joi = require('joi');

const errors = {
  'string.empty': 'Some required fields are missing',
  'any.required': 'Some required fields are missing',
};

const createPostSchema = Joi.object({
  title: Joi.string().required().messages(errors),
  content: Joi.string().required().messages(errors),
  categoryIds: Joi.array().required().messages(errors),
});

const updatePostSchema = Joi.object({
  title: Joi.string().required().messages(errors),
  content: Joi.string().required().messages(errors),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
};