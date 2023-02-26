const multer = require('multer');
const path = require('path');

const { ctrlWrapper, HttpError } = require('../helpers');

const tempDir = path.join(__dirname, '../', 'tmp');

const avatarMaxSize = 2097152; // 2 Mb
const avatarInputName = 'avatar';

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: avatarMaxSize,
};

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(HttpError(400, 'Unsupported avatar format. Choose jpeg or png'));
  }
}

const upload = multer({
  storage: multerConfig,
  limits,
  fileFilter,
});

module.exports = ctrlWrapper(upload.single(avatarInputName));
