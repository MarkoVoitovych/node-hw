const express = require('express');

const { contactsControllers: ctrl } = require('../../controllers');
const { validateBody } = require('../../middlewares');
const { addSchema } = require('../../schemas');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.add);

router.put('/:contactId', validateBody(addSchema), ctrl.update);

router.delete('/:contactId', ctrl.remove);

module.exports = router;
