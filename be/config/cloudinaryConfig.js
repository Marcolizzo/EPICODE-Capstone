const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//archivio esterno su cloudinary per immagini
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Capstone",
        allowedFormats: ['jpeg', 'png', 'jpg'],
        public_id: (req, file) => file.name
    }
})

module.exports = { cloudinary, cloudStorage };