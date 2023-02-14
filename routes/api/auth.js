const express = require('express');

const { authControllers: ctrl } = require('../../controllers');
const { validateBody, auth } = require('../../middlewares');
const { schemas } = require('../../models/user.model');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
// validateBody(schemas.registerSchema)

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
// validateBody(schemas.loginSchema)

router.post('/logout', auth, ctrl.logout);

module.exports = router;
