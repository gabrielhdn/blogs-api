const { validateToken } = require('../utils/JWT');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { id } = validateToken(token);
    req.user = id;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};