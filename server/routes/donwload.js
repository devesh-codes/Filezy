// routes/download.js
const express = require('express');
const File = require('../models/file');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// GET /download/:id


router.get('/:id', async (req, res) => {
  try {
    const file = await File.findOne({ downloadId: req.params.id });

    if (!file) return res.status(404).json({ error: 'File not found or expired' });

    const filePath = path.join(__dirname, '..', 'uploads', file.storageName);

    if (!fs.existsSync(filePath)) {
      return res.status(410).json({ error: 'File has been removed from server' });
    }

    res.download(filePath, file.originalName);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Download failed' });
  }
});

module.exports = router;
