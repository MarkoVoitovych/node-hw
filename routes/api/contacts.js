const express = require('express');

const { contactsControllers: ctrl } = require('../../controllers');
const { validateBody, isValidId, auth } = require('../../middlewares');
const { schemas } = require('../../models/contact.model');

const router = express.Router();

router.get('/', auth, ctrl.getAll);

router.get('/:contactId', auth, isValidId, ctrl.getById);

router.post('/', auth, validateBody(schemas.addSchema), ctrl.add);

router.put(
  '/:contactId',
  auth,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.update,
);

router.patch(
  '/:contactId/favourite',
  auth,
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatus,
);

router.delete('/:contactId', auth, isValidId, ctrl.remove);

module.exports = router;
