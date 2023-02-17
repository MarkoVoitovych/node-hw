const express = require('express');

const { authControllers: ctrl } = require('../../controllers');
const { validateBody, authentication } = require('../../middlewares');
const { schemas } = require('../../models/user.model');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.post('/logout', authentication, ctrl.logout);

router.post('/refresh', ctrl.refresh);

module.exports = router;
