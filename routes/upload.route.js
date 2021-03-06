const express = require("express");
const router = express.Router();
const fileUploader = require("../configs/cloudinary.config");

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  res.status(200).json({ cloudinaryUrl: req.file.path });
})

module.exports = router;