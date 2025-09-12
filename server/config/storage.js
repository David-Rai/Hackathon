import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'greenguard', // optional
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export default storage;
