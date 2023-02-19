const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { HttpError } = require('../helpers');

const { JWT_ACCESS_SECRET } = process.env;

const authentication = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer' || !token) {
      next(HttpError(400, 'No token provided'));
      return;
    }
    const { id } = jwt.verify(token, JWT_ACCESS_SECRET);
    const user = await User.findById(id);

    if (!user) {
      next(HttpError(404, "User doesn't exist"));
      return;
    }

    if (!user.accessToken || user.accessToken !== token) {
      next(HttpError(401, 'Not authorized'));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, 'Not authorized'));
  }
};

module.exports = authentication;
