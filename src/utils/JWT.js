const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const createToken = (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
};

const validateToken = (token) => jwt.verify(token, SECRET);

module.exports = {
  createToken,
  validateToken,
};