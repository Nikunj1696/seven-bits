const fs = require("fs");
const multer = require("multer");
const path = require("path");
const config = require("../utils/constants");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    let fileDir = config.profile_path;
    if (file.filename === "image") {
      fileDir = config.product_path;
    }

    if (!fs.existsSync(fileDir)) {
      fs.mkdir(fileDir, { recursive: true }, (error) => cb(error, fileDir));
    } else {
      cb(null, fileDir);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const fileFilter = (req, file, upload) => {
  // reject a file
  const mimtypes = ["image/jpeg", "image/jpg", "image/png"];
  if (inArray(file.mimetype, mimtypes)) {
    upload(null, true);
  } else {
    upload(new Error("Only JPEG, JPG & PNG files allowed"), false);
  }
};

function inArray(needle, haystack) {
  const length = haystack.length;
  for (let i = 0; i < length; i++) {
    if (haystack[i] == needle) return true;
  }
  return false;
}

const fileUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * parseInt(config.fileSizeLimit) },
  fileFilter: fileFilter,
});

module.exports = fileUpload;
