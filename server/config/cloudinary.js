const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

let isCloudConfigured = false;
let upload = multer({ dest: 'uploads/' }); // Default fallback to local storage if not configured

if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name'
) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'pandas_kitchen',
            allowed_formats: ['jpg', 'png', 'jpeg'],
        },
    });

    upload = multer({ storage: storage });
    isCloudConfigured = true;
} else {
    // If not configured, we still export a valid multer instance (local) 
    // but routes will need to handle the logic of "Do nothing" if deemed strictly necessary.
    // However, user said "Upload buttons... Do nothing OR Show neutral text".
    // Since we are "Replacing" the file, using local 'dest' allows code to run without crashing 
    // even if it uploads to a temp 'uploads/' folder locally.
    // But for "Status", we report "Not Configured".
}

module.exports = { cloudinary, upload, isCloudConfigured };
