const { Contact } = require("../models/contact");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json({
    status: "success",
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
    status: "success",
    code: 200,
    data: result,
  });
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

const update = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
  });
};

const updateStatus = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: result,
  });
};

const remove = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findByIdAndRemove({ _id: contactId });
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "success",
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
