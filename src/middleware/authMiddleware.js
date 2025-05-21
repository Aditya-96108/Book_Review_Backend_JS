const jwt = require('jsonwebtoken');
const ApiError = require('../utils/error');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new ApiError(401, 'Access token required');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new ApiError(403, 'Invalid token');
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;