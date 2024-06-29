const express = require('express');
const multer = require('multer');
const File = require('./models/File');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const newFile = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });
        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file.' });
    }
});

module.exports = router;
