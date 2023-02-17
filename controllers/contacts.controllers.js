const { Contact } = require('../models');
const { ctrlWrapper, HttpError } = require('../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favourite } = req.query;

  const skip = Math.abs((Math.abs(page) - 1) * limit);

  const result = await Contact.find(
    favourite ? { owner, favourite } : { owner },
    '-createdAt -updatedAt',
    {
      skip,
      limit,
    },
  ).populate('owner', '_id name email');

  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findOne(
    { _id: contactId, owner: req.user._id },
    '-createdAt -updatedAt',
  ).populate('owner', '_id name email');
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
  });
};

const update = async (req, res) => {
  const contactId = req.params.contactId;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    {
      new: true,
    },
  ).populate('owner', '_id name email');
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

const updateStatus = async (req, res) => {
  const contactId = req.params.contactId;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    {
      new: true,
    },
  ).populate('owner', '_id name email');
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: result,
  });
};

const remove = async (req, res) => {
  const contactId = req.params.contactId;

  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: req.user._id,
  });
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  updateStatus: ctrlWrapper(updateStatus),
  remove: ctrlWrapper(remove),
};
