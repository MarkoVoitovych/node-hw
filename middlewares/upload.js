const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'tmp');

const avatarMaxSize = 2097152; // 2 Mb

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: avatarMaxSize,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
