const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');

const { ctrlWrapper, HttpError } = require('../helpers');
const { User } = require('../models');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const savedAvatarHeight = 250;

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

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, 'No avatar');
    }
    const { path: tempUpload, filename } = req.file;
    const { _id } = req.user;
    const extention = filename.split('.').pop();
    const avatarName = `${_id}_avatar.${extention}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    const avatarURL = path.join('avatars', avatarName);

    await Jimp.read(tempUpload)
      .then(avatar => {
        return avatar.resize(Jimp.AUTO, savedAvatarHeight).write(tempUpload);
      })
      .catch(err => {
        throw err;
      });

    await fs.rename(tempUpload, resultUpload);

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
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    next(error);
  }
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar,
};
