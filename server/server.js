// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static file access (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const uploadRoute = require('./routes/upload');
const downloadRoute = require('./routes/donwload');

app.use('/api/upload', uploadRoute);
app.use('/download', downloadRoute);

// Root
app.get('/', (req, res) => {
  res.send('TempSend API is running...');
});

// MongoDB Connect & Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch((err) => {
  console.error('DB connection error:', err);
});
