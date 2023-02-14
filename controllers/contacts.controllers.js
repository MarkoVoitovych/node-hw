const { Contact } = require('../models');
const { ctrlWrapper, HttpError } = require('../helpers');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, '-createdAt -udatedAt', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id name email');
  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
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
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
  });
};

const update = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
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
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
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
  const result = await Contact.findByIdAndRemove(contactId);
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
