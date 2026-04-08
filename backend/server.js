const express = require('express');
const cors = require('cors');
require('dotenv').config();

const publicRoutes = require('./routes/public');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const pool = require('./config/db');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// ✅ CORRECT 404 Handler (use string path)
app.use((req, res) => {  // ❌ Remove '*'
    res.status(404).json({ message: 'API route not found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error('🚨 SERVER ERROR:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
    });
    res.status(500).json({
        message: 'Server error',
        ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
});

// ✅ Test DB connection
pool.getConnection()
    .then(() => console.log('✅ MySQL Connected!'))
    .catch(err => console.error('❌ MySQL Error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log(`📱 Frontend: ${process.env.FRONTEND_URL}`);
});