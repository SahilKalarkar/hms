const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.use(auth);

router.get('/dashboard', async (req, res) => {
    try {
        const [
            [patients],
            [doctors],
            [appointments],
            [departments]
        ] = await Promise.all([
            pool.execute('SELECT COUNT(*) as count FROM patients'),
            pool.execute('SELECT COUNT(*) as count FROM doctors'),
            pool.execute('SELECT COUNT(*) as count FROM appointments'),
            pool.execute('SELECT COUNT(*) as count FROM departments')
        ]);

        res.json({
            stats: {
                patients: patients[0]?.count || 0,
                doctors: doctors[0]?.count || 0,
                appointments: appointments[0]?.count || 0,
                departments: departments[0]?.count || 0
            }
        });
    } catch (err) {
        console.error('Dashboard error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ✅ /admin/dashboard/stats - All key metrics
router.get('/dashboard/stats', async (req, res) => {
    try {
        const [stats] = await pool.execute(`
            SELECT 
                -- Total Patients (from appointments as proxy)
                (SELECT COUNT(DISTINCT CONCAT(name, email, phone)) FROM appointments) as patients,
                
                -- Active Doctors
                (SELECT COUNT(*) FROM doctors WHERE status = 'active') as doctors,
                
                -- Active Appointments (pending + confirmed)
                (SELECT COUNT(*) FROM appointments 
                 WHERE status IN ('pending', 'confirmed')) as appointments,
                 
                -- Revenue (appointments * ₹500)
                (SELECT COALESCE(SUM(CASE WHEN status = 'completed' THEN 500 ELSE 0 END), 0) 
                 FROM appointments) as revenue,
                 
                -- Occupancy Rate (mock 95%)
                95 as occupancy,
                
                -- Avg Rating (mock 4.8)
                4.8 as rating
        `);

        res.json(stats[0]);
    } catch (err) {
        console.error('Dashboard stats error:', err);
        res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
    }
});

// ✅ /admin/dashboard/charts - Charts data (your code + improvements)
router.get('/dashboard/charts', async (req, res) => {
    try {
        // Revenue by month (Last 6 months)
        const [revenue] = await pool.execute(`
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') as month,
                COUNT(*) * 500 as revenue
            FROM appointments 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY month ASC
        `);

        // Departments doctor count (Top 6)
        const [departments] = await pool.execute(`
            SELECT 
                COALESCE(d.name, 'General') as department_name,
                COUNT(doc.id) as count,
                COUNT(apt.id) as appointments_count
            FROM departments d
            LEFT JOIN doctors doc ON d.id = doc.department_id AND doc.status = 'active'
            LEFT JOIN appointments apt ON d.id = apt.department_id
            GROUP BY d.id, d.name
            ORDER BY count DESC
            LIMIT 6
        `);

        // Appointments by status (Pie chart)
        const [statusData] = await pool.execute(`
            SELECT 
                status,
                COUNT(*) as count
            FROM appointments 
            WHERE status IS NOT NULL
            GROUP BY status
        `);

        res.json({
            revenue: revenue.map(r => ({
                month: r.month,
                revenue: parseInt(r.revenue)
            })),
            departments: departments.map(d => ({
                department_name: d.department_name,
                count: parseInt(d.count),
                appointments_count: parseInt(d.appointments_count)
            })),
            status: statusData.map(s => ({
                status: s.status,
                count: parseInt(s.count)
            }))
        });
    } catch (err) {
        console.error('Dashboard charts error:', err);
        res.status(500).json({ message: 'Failed to fetch charts', error: err.message });
    }
});

// --------------------------------- FOR DOCTORS -------------------------------------- //
router.get('/doctors', async (req, res) => {
    try {
        const [doctors] = await pool.execute(`
            SELECT 
                d.id,
                d.name,
                d.email,
                d.phone,
                d.experience,
                d.status,
                COALESCE(d.patient_count, 0) as patients,
                COALESCE(dept.name, 'General') as department_name,
                d.department_id  
            FROM doctors d 
            LEFT JOIN departments dept ON d.department_id = dept.id 
            ORDER BY d.created_at DESC
        `);

        const formattedDoctors = doctors.map(doctor => ({
            id: doctor.id,
            name: doctor.name,
            email: doctor.email,
            phone: doctor.phone,
            experience: doctor.experience,
            status: doctor.status || 'inactive',
            patients: doctor.patients,
            department_name: doctor.department_name,
            department_id: doctor.department_id
        }));

        res.json(formattedDoctors);
    } catch (err) {
        console.error('Doctors fetch error:', err);
        res.status(500).json({ message: 'Failed to fetch doctors', error: err.message });
    }
});

router.post('/doctors', async (req, res) => {
    try {
        const { name, department_id, email, phone, experience = 0 } = req.body;

        const safeDepartmentId = department_id !== undefined && department_id !== null ? department_id : null;
        const safeEmail = email || null;
        const safePhone = phone || null;
        const safeExperience = experience || 0;

        const [result] = await pool.execute(
            `INSERT INTO doctors (name, department_id, email, phone, experience, status) 
             VALUES (?, ?, ?, ?, ?, 'active')`,
            [name, safeDepartmentId, safeEmail, safePhone, safeExperience]
        );

        const [newDoctor] = await pool.execute(`
            SELECT d.*, dept.name as department_name 
            FROM doctors d LEFT JOIN departments dept ON d.department_id = dept.id 
            WHERE d.id = ?`,
            [result.insertId]
        );

        res.status(201).json(newDoctor[0]);
    } catch (err) {
        console.error('Add doctor error:', err);
        res.status(500).json({ message: 'Failed to add doctor', error: err.message });
    }
});

router.put('/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, department_id, email, phone, experience } = req.body;

        const safeDepartmentId = department_id !== undefined && department_id !== null ? department_id : null;
        const safeExperience = experience !== undefined && experience !== null ? experience : 0;
        const safeEmail = email || null;
        const safePhone = phone || null;

        await pool.execute(
            `UPDATE doctors SET 
             name = ?, 
             department_id = ?, 
             email = ?, 
             phone = ?, 
             experience = ?
             WHERE id = ?`,
            [name, safeDepartmentId, safeEmail, safePhone, safeExperience, id]
        );

        const [updatedDoctor] = await pool.execute(`
            SELECT d.*, dept.name as department_name, d.department_id
            FROM doctors d 
            LEFT JOIN departments dept ON d.department_id = dept.id 
            WHERE d.id = ?`,
            [id]
        );

        if (updatedDoctor.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json(updatedDoctor[0]);
    } catch (err) {
        console.error('Update doctor error:', err);
        res.status(500).json({ message: 'Failed to update doctor', error: err.message });
    }
});

router.delete('/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute('DELETE FROM doctors WHERE id = ?', [id]);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        console.error('Delete doctor error:', err);
        res.status(500).json({ message: 'Failed to delete doctor' });
    }
});


// --------------------------------- FOR PATIENTS -------------------------------------- //
router.get('/patients', async (req, res) => {
    try {
        const [patients] = await pool.execute(`
            SELECT 
                id,
                name,
                email,
                phone,
                age,
                gender,
                emergency_contact,
                status,
                COALESCE(visits_count, 0) as visits,
                created_at
            FROM patients 
            ORDER BY created_at DESC
        `);

        res.json(patients);
    } catch (err) {
        console.error('Patients fetch error:', err);
        res.status(500).json({ message: 'Failed to fetch patients', error: err.message });
    }
});

router.post('/patients', async (req, res) => {
    try {
        const { name, email, phone, age, gender, emergency_contact } = req.body;

        const [result] = await pool.execute(
            `INSERT INTO patients (name, email, phone, age, gender, emergency_contact, status) 
             VALUES (?, ?, ?, ?, ?, ?, 'active')`,
            [name, email, phone, age, gender, emergency_contact]
        );

        const [newPatient] = await pool.execute(
            'SELECT * FROM patients WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json(newPatient[0]);
    } catch (err) {
        console.error('Add patient error:', err);
        res.status(500).json({ message: 'Failed to add patient', error: err.message });
    }
});

router.put('/patients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, age, gender, emergency_contact } = req.body;

        await pool.execute(
            `UPDATE patients SET 
             name = ?, email = ?, phone = ?, age = ?, gender = ?, emergency_contact = ?
             WHERE id = ?`,
            [name, email, phone, age, gender, emergency_contact, id]
        );

        const [updatedPatient] = await pool.execute(
            'SELECT * FROM patients WHERE id = ?',
            [id]
        );

        res.json(updatedPatient[0]);
    } catch (err) {
        console.error('Update patient error:', err);
        res.status(500).json({ message: 'Failed to update patient', error: err.message });
    }
});

router.delete('/patients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute('DELETE FROM patients WHERE id = ?', [id]);
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        console.error('Delete patient error:', err);
        res.status(500).json({ message: 'Failed to delete patient' });
    }
});


// --------------------------------- FOR PATIENTS -------------------------------------- //
router.get('/appointments', async (req, res) => {
    try {
        const [appointments] = await pool.execute(`
            SELECT 
                a.id,
                a.name,
                a.email,
                a.phone,
                a.department_id,
                a.date,
                a.message,
                a.status,
                a.created_at,
                COALESCE(d.name, 'General') as department_name  
            FROM appointments a 
            LEFT JOIN departments d ON a.department_id = d.id
            ORDER BY a.created_at DESC
        `);

        const formatted = appointments.map(apt => ({
            ...apt,
            department_name: apt.department_name
        }));

        res.json(formatted);
    } catch (err) {
        console.error('Appointments GET error:', err);
        res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
    }
});


router.post('/appointments', async (req, res) => {
    try {
        const { name, email, phone, department_id, date, message, status = 'pending' } = req.body;

        const [result] = await pool.execute(
            `INSERT INTO appointments (name, email, phone, department_id, date, message, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, email, phone, department_id || null, date, message || null, status]
        );

        const [newAppointment] = await pool.execute(`
            SELECT a.*, COALESCE(d.name, 'General') as department_name
            FROM appointments a 
            LEFT JOIN departments d ON a.department_id = d.id 
            WHERE a.id = ?`,
            [result.insertId]
        );

        res.status(201).json(newAppointment[0]);
    } catch (err) {
        console.error('POST appointment error:', err);
        res.status(500).json({ message: 'Failed to create appointment', error: err.message });
    }
});

router.put('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, department_id, date, message, status } = req.body;

        const [result] = await pool.execute(
            `UPDATE appointments SET 
             name = ?, email = ?, phone = ?, department_id = ?, date = ?, message = ?, status = ?
             WHERE id = ?`,
            [name, email || null, phone || null, department_id || null, date, message || null, status || 'pending', id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const [updatedAppointment] = await pool.execute(`
            SELECT a.*, COALESCE(d.name, 'General') as department_name
            FROM appointments a 
            LEFT JOIN departments d ON a.department_id = d.id 
            WHERE a.id = ?`,
            [id]
        );

        res.json(updatedAppointment[0]);
    } catch (err) {
        console.error('PUT appointment error:', err);
        res.status(500).json({ message: 'Failed to update appointment', error: err.message });
    }
});

router.delete('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.execute('DELETE FROM appointments WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error('DELETE appointment error:', err);
        res.status(500).json({ message: 'Failed to delete appointment', error: err.message });
    }
});

// --------------------------------- FOR PATIENTS -------------------------------------- //
router.get('/departments', async (req, res) => {
    try {
        const [departments] = await pool.execute(`
            SELECT 
                d.id,
                d.name,
                COALESCE(COUNT(doc.id), 0) as doctor_count,
                COALESCE(COUNT(apt.id), 0) as appointment_count,  
                d.status,
                d.created_at
            FROM departments d
            LEFT JOIN doctors doc ON d.id = doc.department_id AND doc.status = 'active'
            LEFT JOIN appointments apt ON d.id = apt.department_id 
                AND apt.date >= DATE_SUB(NOW(), INTERVAL 1 MONTH) 
            GROUP BY d.id, d.name, d.status, d.created_at
            ORDER BY d.name ASC
        `);

        res.json(departments);
    } catch (err) {
        console.error('Departments GET error:', err);
        res.status(500).json({ message: 'Failed to fetch departments', error: err.message });
    }
});


router.post('/departments', async (req, res) => {
    try {
        const { name, status = 'active' } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO departments (name, status) VALUES (?, ?)',
            [name, status]
        );
        const [newDept] = await pool.execute(`
            SELECT d.*, 
                   COALESCE(COUNT(doc.id), 0) as doctor_count,
                   COALESCE(COUNT(apt.id), 0) as appointment_count
            FROM departments d
            LEFT JOIN doctors doc ON d.id = doc.department_id AND doc.status = 'active'
            LEFT JOIN appointments apt ON d.id = apt.department_id 
                AND apt.date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
            WHERE d.id = ?
            GROUP BY d.id
        `, [result.insertId]);
        res.status(201).json(newDept[0]);
    } catch (err) {
        console.error('POST department error:', err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/departments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;
        await pool.execute(
            'UPDATE departments SET name = ?, status = ? WHERE id = ?',
            [name, status, id]
        );
        const [updated] = await pool.execute(`
            SELECT d.*, 
                   COALESCE(COUNT(doc.id), 0) as doctor_count,
                   COALESCE(COUNT(apt.id), 0) as appointment_count
            FROM departments d
            LEFT JOIN doctors doc ON d.id = doc.department_id AND doc.status = 'active'
            LEFT JOIN appointments apt ON d.id = apt.department_id 
                AND apt.date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
            WHERE d.id = ?
            GROUP BY d.id
        `, [id]);
        res.json(updated[0]);
    } catch (err) {
        console.error('PUT department error:', err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/departments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute('DELETE FROM departments WHERE id = ?', [id]);
        res.json({ message: 'Department deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------- FOR PATIENTS -------------------------------------- //

router.post('/maintenance/toggle', async (req, res) => {
    const { status } = req.body;  // 0=off, 1=on
    try {
        await pool.execute(
            'INSERT INTO settings (key_name, key_value) VALUES ("maintenance_status", ?) ON DUPLICATE KEY UPDATE key_value = ?',
            [status, status]
        );
        res.json({ success: true, maintenance_status: parseInt(status) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --------------------------------- FOR PATIENTS -------------------------------------- //
// /admin/settings (GET)
router.get('/settings', async (req, res) => {
    try {
        const settings = {
            profile: { name: 'Admin User', email: 'admin@hospitalcare.com' },
            // ... other settings
        };
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// /admin/settings/profile (POST)
router.post('/settings/profile', async (req, res) => {
    const { name, email, phone } = req.body;
    // Update user profile
    await pool.execute('UPDATE admins SET name=?, email=?, phone=? WHERE id=?', [name, email, phone, req.user.id]);
    res.json({ success: true });
});

// /admin/backup/create (POST)
router.post('/backup/create', async (req, res) => {
    // Create database backup
    const backup = await createDatabaseBackup();
    res.json({ downloadUrl: `/backups/${backup.filename}` });
});

module.exports = router;