const { User } = require('../models');
const userSchema = require('../schemas/user.schema');

const validateUserSchema = (info) => {
  const { error } = userSchema.validate(info);

  if (error) {
    return { status: 400, message: error.message };
  }

  return null;
};

const doesUserExist = async (email) => User.findOne({ where: { email } });

module.exports = {
  validateUserSchema,
  doesUserExist,
};