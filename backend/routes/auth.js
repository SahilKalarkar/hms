const express = require('express');
const jwt = require('jsonwebtoken');  // ✅ Remove bcrypt
const pool = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Admin Login - PLAINTEXT PASSWORD
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin
        const [admins] = await pool.execute(
            'SELECT * FROM admins WHERE email = ?',
            [email]
        );

        if (admins.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const admin = admins[0];

        // ✅ PLAINTEXT password check
        if (admin.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // JWT Token
        const payload = {
            id: admin.id,
            email: admin.email,
            role: admin.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;