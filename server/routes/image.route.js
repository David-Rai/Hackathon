import express from 'express';
import multer from 'multer';
import storage from '../config/storage.js';

const upload = multer({ storage });

export const ImageRouter = express.Router();

ImageRouter.post('/upload', upload.single('image'), (req, res) => {
    console.log("Uploading image....")
    
    try {
        return res.json({
            image_url: req.file.path,
            publicId: req.file.filename,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Upload failed' });
    }
});
