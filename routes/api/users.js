const express = require('express');

const { usersControllers: ctrl } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = express.Router();

router.get('/current', auth, ctrl.getCurrent);

module.exports = router;
