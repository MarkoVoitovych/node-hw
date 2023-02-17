const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { TOKEN_KEY } = process.env;
const { User } = require('../models');
const { ctrlWrapper, HttpError } = require('../helpers');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (user) {
    throw HttpError(409, `Email in use.`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashPassword,
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      id: newUser._id,
      email: newUser.email,
      subscription: 'starter',
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong.');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong.');
  }

  const payload = {
    id: user._id,
  };

  const accessToken = jwt.sign(payload, TOKEN_KEY, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, TOKEN_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.json({
    status: 'success',
    code: 200,
    data: {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email,
        subscription: user.subscription,
      },
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: null, refreshToken: null });
  res.status(204).json();
};

const refresh = async (req, res) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw HttpError(401, 'Not authorized');
  }
  const { id } = jwt.verify(token, TOKEN_KEY);
  const user = await User.findById(id);
  if (!user || !user.refreshToken || user.refreshToken !== token) {
    throw HttpError(401, 'Not authorized');
  }

  const payload = {
    id: user._id,
  };

  const accessToken = jwt.sign(payload, TOKEN_KEY, { expiresIn: '30m' });
  const refreshToken = jwt.sign(payload, TOKEN_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.json({
    status: 'success',
    code: 200,
    data: {
      accessToken,
      refreshToken,
      id: user._id,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
};
