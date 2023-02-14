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

// const getAll = async (_, res) => {
//   const result = await Contact.find();
//   res.json({
//     status: 'success',
//     code: 200,
//     data: result,
//   });
// };

// const updateStatus = async (req, res) => {
//   const contactId = req.params.contactId;
//   const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, `Contact with id ${contactId} not found`);
//   }
//   res.status(200).json({
//     status: 'success',
//     code: 200,
//     data: result,
//   });
// };

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
