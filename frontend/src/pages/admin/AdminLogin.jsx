// frontend/src/pages/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { GLOBAL_PATH } from '../../config';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/admin/login', values);
            localStorage.setItem('adminToken', res.data.token);
            message.success('Login successful!');
            navigate('/admin/dashboard');
        } catch (err) {
            message.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 to-cyan-50 py-12 px-2">
            <Card className="w-full max-w-md shadow-2xl border-none bg-white/90 backdrop-blur-xl">
                <div className='mb-8 flex flex-col items-center justify-center'>
                    <h2 className="text-3xl font-semibold text-center text-slate-800">Admin Portal</h2>
                    <p className='text-lg font-semibold'>Login to Continue....</p>
                </div>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input size="large" placeholder="Enter email id" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password size="large" placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={loading}
                                className="col-span-2! rounded-xl shadow-lg bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                            >
                                Login to Admin
                            </Button>
                            <Button
                                onClick={() => navigate(`${GLOBAL_PATH}/`)}
                                type="primary"
                                ghost
                                size="large"
                                className="col-span-1 rounded-xl shadow-lg bg-linear-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                            >
                                Home Page
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
                <Divider />
                {/* <div className="text-center text-sm text-slate-500">
                    <strong>Email:</strong> admin@hospitalcare.com<br />
                    <strong>Password:</strong> admin123
                </div> */}
            </Card>
        </div>
    );
};

export default AdminLogin;