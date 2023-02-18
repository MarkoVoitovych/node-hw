const express = require('express');

const { userSchemas } = require('../../shemas');
const { usersControllers: ctrl } = require('../../controllers');
const { authentication, validateBody } = require('../../middlewares');

const router = express.Router();

router.get('/current', authentication, ctrl.getCurrent);

router.patch(
  '/subscription',
  authentication,
  validateBody(userSchemas.updateSubscriptionSchema),
  ctrl.updateSubscription,
);

module.exports = router;
