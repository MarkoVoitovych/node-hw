const express = require('express');

const { contactsControllers: ctrl } = require('../../controllers');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.update,
);

router.patch(
  '/:contactId/favourite',
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatus,
);

router.delete('/:contactId', isValidId, ctrl.remove);

module.exports = router;
