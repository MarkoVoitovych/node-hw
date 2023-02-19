const express = require('express');

const { authControllers: ctrl } = require('../../controllers');
const {
  validateBody,
  authentication,
  refreshToken,
} = require('../../middlewares');
const { userSchemas } = require('../../shemas');

const router = express.Router();

router.post(
  '/register',
  validateBody(userSchemas.registerSchema),
  ctrl.register,
);

router.post('/login', validateBody(userSchemas.loginSchema), ctrl.login);

router.post('/logout', authentication, ctrl.logout);

router.post('/refresh', refreshToken, ctrl.refresh);

module.exports = router;
