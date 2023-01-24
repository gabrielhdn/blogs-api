const loginService = require('../services/login.service.js');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginService.login(email, password);
    res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
};