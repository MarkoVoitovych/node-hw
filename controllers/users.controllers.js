const { ctrlWrapper } = require('../helpers');

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

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
