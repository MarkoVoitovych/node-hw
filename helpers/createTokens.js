const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const createTokens = id => {
  const payload = {
    id,
  };
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '23h',
  });
  return { accessToken, refreshToken };
};

module.exports = createTokens;
