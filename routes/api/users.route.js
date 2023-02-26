const express = require('express');

const { userSchemas } = require('../../shemas');
const { usersControllers: ctrl } = require('../../controllers');
const {
  authentication,
  validateBody,
  uploadCloud,
} = require('../../middlewares');

const router = express.Router();

router.get('/current', authentication, ctrl.getCurrent);

router.patch(
  '/subscription',
  authentication,
  validateBody(userSchemas.updateSubscriptionSchema),
  ctrl.updateSubscription,
);

router.patch('/avatar', authentication, uploadCloud, ctrl.updateAvatar);

module.exports = router;
