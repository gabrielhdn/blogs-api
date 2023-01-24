const { User } = require('../models');
const { createToken } = require('../utils/JWT');

const isBodyValid = (email, password) => email && password;

const login = async (email, password) => {
  if (!isBodyValid(email, password)) {
    const err = { status: 400, message: 'Some required fields are missing' };
    throw err;
  }
  
  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) {
    const err = { status: 400, message: 'Invalid fields' };
    throw err;
  }

  const token = createToken({ id: user.id, email });
  return token;
};

module.exports = {
  login,
};