const { ctrlWrapper } = require('../helpers');
const { User } = require('../models');

const getCurrent = async (req, res) => {
  const { email, _id } = req.user;

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        id: _id,
        email,
        subscription: 'starter',
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

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
};
