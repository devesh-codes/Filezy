// routes/upload.js
const express = require('express');
const multer = require('multer');
const { nanoid } = require('nanoid');
const File = require('../models/file');
const path = require('path');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const unique = nanoid(8) + path.extname(file.originalname);
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 } // 2GB
});

// POST /api/upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { validFor } = req.body;

    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const expiresInMs = {
      '1hour': 3600000,
      '1day': 86400000,
      '1week': 604800000
    }[validFor] || 604800000;

    const file = new File({
      originalName: req.file.originalname,
      storageName: req.file.filename,
      fileSize: req.file.size,
      downloadId: nanoid(12),
      expiresAt: new Date(Date.now() + expiresInMs)
    });

    await file.save();

    res.json({
      message: 'File uploaded successfully',
      downloadLink: `${req.protocol}://${req.get('host')}/download/${file.downloadId}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
