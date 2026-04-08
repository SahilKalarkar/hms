const express = require('express');
const pool = require('../config/db');


const router = express.Router();

router.post('/appointments', async (req, res) => {
    try {
        const { name, email, phone, department_id, date, message } = req.body;

        // Basic validation
        if (!name || !phone || !date) {
            return res.status(400).json({ message: 'Name, phone, and date required' });
        }

        const [result] = await pool.execute(
            `INSERT INTO appointments (name, email, phone, department_id, date, message, status, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`,
            [name, email || null, phone, department_id || null, date, message || null]
        );

        const [newAppointment] = await pool.execute(`
            SELECT a.*, COALESCE(d.name, 'General') as department_name
            FROM appointments a 
            LEFT JOIN departments d ON a.department_id = d.id 
            WHERE a.id = ?`,
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully!',
            appointment: newAppointment[0]
        });
    } catch (err) {
        console.error('Public appointment error:', err);
        res.status(500).json({ message: 'Failed to book appointment', error: err.message });
    }
});


router.get('/departments', async (req, res) => {
    try {
        const [departments] = await pool.execute(`
            SELECT id, name, status 
            FROM departments 
            WHERE status = 'active' 
            ORDER BY name ASC
        `);
        res.json(departments);
    } catch (err) {
        console.error('Public departments error:', err);
        res.status(500).json({ message: 'Failed to fetch departments' });
    }
});

module.exports = router;