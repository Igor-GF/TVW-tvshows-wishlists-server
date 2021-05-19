const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "server-tv-shows",
    resource_type: "image",
    allowed_formats: ["jpg", "png"],
    transformation: [{ width: 150, height: 225, crop: "limit" }],
    use_filename: true
  }
})

module.exports = multer({ storage });