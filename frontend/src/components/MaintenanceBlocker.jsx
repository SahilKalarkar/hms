import React, { useState, useEffect } from 'react';
import { Result, Button, Spin } from 'antd';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const MaintenanceBlocker = ({ children }) => {
    const [maintenance, setMaintenance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkMaintenance();
    }, []);

    const checkMaintenance = async () => {
        try {
            const res = await api.get('/admin/settings/maintenance');  // Public endpoint
            setMaintenance(res.data.maintenance_status);
        } catch (err) {
            // If API fails, assume live
            setMaintenance(0);
        }
    };

    if (maintenance === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 to-red-50">
                <Spin size="large" />
            </div>
        );
    }

    if (maintenance === 1) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-900 via-orange-900/20 to-red-900/20">
                <div className="max-w-md w-full text-center text-white space-y-8">
                    <div className="w-32 h-32 mx-auto mb-8">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="251.2" strokeLinecap="round">
                                <animate attributeName="strokeDashoffset" dur="2s" values="251.2;0;251.2" repeatCount="indefinite" />
                            </circle>
                            <path d="M50 20 L50 35 M50 65 L50 80 M25 50 L40 50 M60 50 L75 50" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                            Under Maintenance
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                            We're working hard to improve your experience.
                            <br />We'll be back soon!
                        </p>
                        <div className="space-y-3 text-sm opacity-75">
                            <p>⏰ Estimated time: 2-4 hours</p>
                            <p>📧 contact@hospitalcare.com</p>
                            <p>📱 Emergency: +91 9876543210 (24/7)</p>
                        </div>
                    </div>
                    <Space>
                        <Button
                            type="primary"
                            size="large"
                            onClick={checkMaintenance}
                            className="px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl font-semibold text-lg"
                        >
                            🔄 Check Status
                        </Button>
                        <Button
                            href="tel:+91XXXXXXXXXX"
                            size="large"
                            className="px-8 py-4 rounded-2xl shadow-xl font-semibold text-lg"
                        >
                            📞 Emergency
                        </Button>
                    </Space>
                </div>
            </div>
        );
    }

    return children;  // Render normal site
};

export default MaintenanceBlocker;