const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { HttpError } = require('../helpers');
const { TOKEN_KEY } = process.env;

const authentication = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer') {
      next(HttpError(401, 'Not authorized'));
    }
    const { id } = jwt.verify(token, TOKEN_KEY);
    const user = await User.findById(id);
    if (!user || !user.accessToken || user.accessToken !== token) {
      next(HttpError(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, 'Not authorized'));
  }
};

module.exports = authentication;
