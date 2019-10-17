const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const controller = require("../../controllers/profile");

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      !fs.existsSync(path.join(__dirname, "../../", process.env.UPLOAD_DIR))
    ) {
      fs.mkdirSync(path.join(__dirname, "../../", process.env.UPLOAD_DIR), {
        recursive: true
      });
    }

    cb(null, path.join(__dirname, "../../", process.env.UPLOAD_DIR));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 2000000 }
});

router.get("/", controller.check);
router.patch("/", upload.single("avatar"), controller.update);

module.exports = router;
