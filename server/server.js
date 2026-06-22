const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const { connectDB, getDBStatus } = require('./config/db');

// Database Connection
connectDB();

// Routes
const heroRoutes = require('./routes/heroRoutes');
const productRoutes = require('./routes/productRoutes');
const extraRoutes = require('./routes/extraRoutes');
const offerRoutes = require('./routes/offerRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const settingRoutes = require('./routes/settingRoutes');
const ourStoryRoutes = require('./routes/ourStoryRoutes');
const getInTouchRoutes = require('./routes/getInTouchRoutes');

app.use('/api/hero', heroRoutes);
app.use('/api/products', productRoutes);
app.use('/api/extras', extraRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/our-story', ourStoryRoutes);
app.use('/api/contact', getInTouchRoutes);

const { isCloudConfigured } = require('./config/cloudinary');

// System Status Check
app.get('/api/system/status', (req, res) => {
    const status = {
        mongodb: getDBStatus() ? 'Connected' : 'Disconnected',
        cloud: isCloudConfigured ? 'Connected' : 'Not Configured'
    };
    res.json(status);
});

app.get('/', (req, res) => {
    res.send("Panda's Kitchen Backend is running!");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
