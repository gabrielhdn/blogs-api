const userService = require('../services/user.service');

const create = async (req, res, next) => {
  try {
    const token = await userService.create(req.body);
    res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getOne(id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res) => {
  await userService.remove(req.user);
  res.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
};