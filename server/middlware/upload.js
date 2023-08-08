const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const allowedMimeTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/heif",
      "image/heic",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      console.log("Only images (JPEG, PNG, HEIF, HEIC) are supported.");
      callback(null, false);
    }
  },
});

module.exports = upload;
