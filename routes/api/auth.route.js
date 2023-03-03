const express = require('express');

const { authControllers: ctrl } = require('../../controllers');
const { userSchemas } = require('../../shemas');
const {
  validateBody,
  authentication,
  refreshToken,
} = require('../../middlewares');

const router = express.Router();

router.post(
  '/register',
  validateBody(userSchemas.registerSchema),
  ctrl.register,
);

router.post('/login', validateBody(userSchemas.loginSchema), ctrl.login);

router.post(
  '/refresh',
  validateBody(userSchemas.refreshSchema),
  refreshToken,
  ctrl.refresh,
);

router.post('/logout', authentication, ctrl.logout);

module.exports = router;
