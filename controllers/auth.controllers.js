const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../models');
const {
  ctrlWrapper,
  HttpError,
  createTokens,
  sendEmail,
} = require('../helpers');

const { HASH_POWER, BASE_URL } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (user) {
    throw HttpError(409, `Email in use.`);
  }

  const hashPassword = await bcrypt.hash(password, Number(HASH_POWER));
  const avatarURL = gravatar.url(email);
  const verificationCode = uuidv4();

  const newUser = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verificationEmail = {
    to: email,
    subject: 'Сonfirm your registration',
    html: `<a href="${BASE_URL}/api/users/verify/${verificationCode}" target="_blank">Press to confirm your email</a>`,
  };

  await sendEmail(verificationEmail);

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
    throw HttpError(403, 'Email or password is wrong.');
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(403, 'Email or password is wrong.');
  }
  if (!user.verify) {
    throw HttpError(403, 'Verify your email');
  }

  const tokens = createTokens(user._id);

  await User.findByIdAndUpdate(user._id, { ...tokens });

  res.json({
    status: 'success',
    code: 200,
    data: {
      ...tokens,
      user: {
        id: user._id,
        email,
        subscription: user.subscription,
      },
    },
  });
};

const refresh = async (req, res) => {
  const { _id } = req.user;

  const tokens = createTokens(_id);

  await User.findByIdAndUpdate(_id, { ...tokens });

  res.json({
    status: 'success',
    code: 200,
    data: {
      ...tokens,
      id: _id,
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
  refresh: ctrlWrapper(refresh),
};
