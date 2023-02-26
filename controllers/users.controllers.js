const { ctrlWrapper, HttpError } = require('../helpers');
const { User } = require('../models');

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
};
