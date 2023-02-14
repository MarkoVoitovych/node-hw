const express = require('express');

const { authControllers: ctrl } = require('../../controllers');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user.model');

const router = express.Router();

router.post('/register', ctrl.register);
// validateBody(schemas.registerSchema)

router.post('/login', ctrl.login);
// validateBody(schemas.loginSchema)

module.exports = router;
