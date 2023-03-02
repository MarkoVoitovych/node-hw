const { ctrlWrapper, HttpError, sendEmail } = require('../helpers');
const { User } = require('../models');
const { BASE_URL } = process.env;

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verificationCode: null,
    verify: true,
  });

  res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Verification successful',
    },
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (user.verify) {
    throw HttpError(404, 'Verification has already been passed');
  }

  const verificationEmail = {
    to: email,
    subject: 'Сonfirm your registration',
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationCode}" target="_blank">Press to confirm your email</a>`,
  };

  await sendEmail(verificationEmail);

  res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Verification email sent',
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, _id, subscription, avatarURL } = req.user;

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        id: _id,
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

const updateSubscription = async (req, res) => {
  const { email, _id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription });

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        id: _id,
        email,
        subscription,
      },
    },
  });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(
      400,
      'Unsupported avatar format. Choose file with extention jpeg or png',
    );
  }

  const { _id } = req.user;
  const { path: avatarURL } = req.file;

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        id: _id,
        avatarURL,
      },
    },
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
