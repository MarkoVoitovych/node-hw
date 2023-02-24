const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { HttpError } = require('../helpers');

const { JWT_REFRESH_SECRET } = process.env;

const refreshToken = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer' || !token) {
      next(HttpError(400, 'No token provided'));
      return;
    }
    const { id } = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(404, "User doesn't exist"));
      return;
    }
    if (!user.refreshToken || user.refreshToken !== token) {
      next(HttpError(403));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(403));
  }
};

module.exports = refreshToken;
