const express = require('express');

const { contactsControllers: ctrl } = require('../../controllers');
const {
  validateBody,
  isValidId,
  authentication,
} = require('../../middlewares');
const { contactSchemas } = require('../../shemas');

const router = express.Router();

router.get('/', authentication, ctrl.getAll);

router.get('/:contactId', authentication, isValidId, ctrl.getById);

router.post(
  '/',
  authentication,
  validateBody(contactSchemas.addSchema),
  ctrl.add,
);

router.put(
  '/:contactId',
  authentication,
  isValidId,
  validateBody(contactSchemas.addSchema),
  ctrl.update,
);

router.patch(
  '/:contactId/favourite',
  authentication,
  isValidId,
  validateBody(contactSchemas.updateStatusSchema),
  ctrl.updateStatus,
);

router.delete('/:contactId', authentication, isValidId, ctrl.remove);

module.exports = router;
