const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { HttpError, ctrlWrapper } = require('../helpers');

const { JWT_ACCESS_SECRET } = process.env;

const authentication = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  let payload = '';

  if (bearer !== 'Bearer' || !token) {
    throw HttpError(401, 'No token provided');
  }

  try {
    payload = jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (error) {
    throw HttpError(401, 'No token provided');
  }

  const user = await User.findById(payload.id);

  if (!user) {
    throw HttpError(404, "User doesn't exist");
  }

  if (!user.accessToken || user.accessToken !== token) {
    throw HttpError(401, 'Not authorized');
  }

  req.user = user;
  next();
};

module.exports = ctrlWrapper(authentication);
