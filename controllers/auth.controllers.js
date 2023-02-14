const jwt = require('jsonwebtoken');

const { TOKEN_KEY } = process.env;
const { User } = require('../models');
const { ctrlWrapper, HttpError } = require('../helpers');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `Email in use.`);
  }

  const newUser = new User({ name, email });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      _id: newUser._id,
      email,
      subscription: 'starter',
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
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
        subscription: 'starter',
      },
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { accessToken: null, refreshToken: null });
  res.status(204).json();
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
