const Joi = require('joi');

const pattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

module.exports = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().regex(pattern).required().messages({
    'string.pattern.base': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});