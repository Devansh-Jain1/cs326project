const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./auth');
const uploadRoutes = require('./upload');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/mydatabase'; // Corrected MongoDB URI

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);

// Catch-all to serve frontend files
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
