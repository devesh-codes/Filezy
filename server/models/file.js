// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: String,
  storageName: String,
  fileSize: Number,
  fileSize: Number,
  downloadId: String,
  expiresAt: Date,
}, {
  timestamps: true,
});

// Auto-delete document when `expiresAt` is reached
fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('File', fileSchema);
