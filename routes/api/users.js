const express = require('express');

const { schemas } = require('../../models/user.model');
const { usersControllers: ctrl } = require('../../controllers');
const { authentication, validateBody } = require('../../middlewares');

const router = express.Router();

router.get('/current', authentication, ctrl.getCurrent);

router.patch(
  '/subscription',
  authentication,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription,
);

module.exports = router;
