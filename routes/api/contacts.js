const express = require('express');

const { contactsControllers: ctrl } = require('../../controllers');
const {
  validateBody,
  isValidId,
  authentication,
} = require('../../middlewares');
const { schemas } = require('../../models/contact.model');

const router = express.Router();

router.get('/', authentication, ctrl.getAll);

router.get('/:contactId', authentication, isValidId, ctrl.getById);

router.post('/', authentication, validateBody(schemas.addSchema), ctrl.add);

router.put(
  '/:contactId',
  authentication,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.update,
);

router.patch(
  '/:contactId/favourite',
  authentication,
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatus,
);

router.delete('/:contactId', authentication, isValidId, ctrl.remove);

module.exports = router;
