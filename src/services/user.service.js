const { User } = require('../models');
const loginService = require('./login.service');
const validations = require('../validations/user.validation');

const create = async (payload) => {
  const { email, password } = payload;
  const error = validations.validateUserSchema(payload);

  if (error) {
    throw error;
  }

  if (await validations.doesUserExist(email)) {
    const err = { status: 409, message: 'User already registered' };
    throw err;
  }
  
  await User.create(payload);
  const token = loginService.login(email, password);
  
  return token;
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getOne = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    const err = { status: 404, message: 'User does not exist' };
    throw err;
  }

  return user;
};

const remove = async (id) => User.destroy({ where: { id } });

module.exports = {
  create,
  getAll,
  getOne,
  remove,
};