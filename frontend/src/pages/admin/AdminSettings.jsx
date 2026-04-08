import React, { useState, useEffect } from 'react';
import {
    Row, Col, Card, Form, Input, Button, Switch, Select, Upload,
    Space, Divider, Alert, Tabs, Avatar, Modal, message
} from 'antd';
import {
    SaveOutlined, ReloadOutlined, UserOutlined, PhoneOutlined,
    MailOutlined, LockOutlined, BellOutlined, DatabaseOutlined,
    CreditCardOutlined, EditOutlined, DownloadOutlined, CopyOutlined
} from '@ant-design/icons';
import api from '../../services/api';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const AdminSettings = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [hospitalLogo, setHospitalLogo] = useState(null);
    const [showBackupModal, setShowBackupModal] = useState(false);

    const [maintenanceStatus, setMaintenanceStatus] = useState(false);
    const [maintenanceLoading, setMaintenanceLoading] = useState(false);


    // Settings data
    const [settings, setSettings] = useState({
        profile: {
            name: 'Admin User',
            email: 'admin@hospitalcare.com',
            phone: '+91 9876543210',
            role: 'Super Admin'
        },
        hospital: {
            name: 'HospitalCare Medical Center',
            address: '123 Health St, Pune, Maharashtra 411001',
            phone: '+91 9876543210',
            email: 'info@hospitalcare.com',
            theme: 'light'
        },
        notifications: {
            email: true,
            sms: false,
            whatsapp: true
        },
        security: {
            twoFactor: false,
            sessionTimeout: 30,
            ipWhitelist: []
        },
        billing: {
            subscription: 'Pro',
            nextPayment: '2026-05-01'
        }
    });

    // Load settings on mount
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const res = await api.get('/admin/settings');
            setSettings(res.data);
            form.setFieldsValue(res.data.profile);
        } catch (err) {
            message.error('Failed to load settings');
        }
    };

    const handleSave = async (values) => {
        setLoading(true);
        try {
            await api.post('/admin/settings/profile', values);
            message.success('Settings saved successfully!');
            loadSettings(); // Reload to show updates
        } catch (err) {
            message.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const handleLogoUpload = ({ file }) => {
        setHospitalLogo(file);
        message.success('Logo uploaded!');
    };

    const createBackup = async () => {
        try {
            const res = await api.post('/admin/backup/create');
            message.success('Backup created! Download ready.');
            setShowBackupModal(false);
        } catch (err) {
            message.error('Backup failed');
        }
    };

    const toggleMaintenance = async (checked) => {
        setMaintenanceLoading(true);
        try {
            const res = await api.post('/admin/maintenance/toggle', { status: checked ? 1 : 0 });
            setMaintenanceStatus(res.data.maintenance_status === 1);
            message.success(checked ? 'Maintenance ON - Site blocked!' : 'Maintenance OFF - Site live!');
        } catch (err) {
            message.error('Toggle failed');
        } finally {
            setMaintenanceLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8 bg-linear-to-br from-slate-50 to-teal-50 min-h-screen">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                    <h1 className="text-2xl font-bold bg-linear-to-r from-slate-800 via-teal-800 to-blue-800 bg-clip-text text-transparent">
                        Settings
                    </h1>
                    <p className="text-slate-600">Manage your profile, hospital info, and system preferences</p>
                </div>
                <Space className='flex! flex-wrap!'>
                    <Button icon={<ReloadOutlined />} onClick={loadSettings} loading={loading}>
                        Refresh
                    </Button>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => form.submit()}
                        className="shadow-xl hover:shadow-2xl"
                    >
                        Save All Changes
                    </Button>

                    <div className="flex items-center gap-4">
                        <Switch
                            checked={maintenanceStatus}
                            onChange={toggleMaintenance}
                            checkedChildren="ON"
                            unCheckedChildren="OFF"
                            className="ml-4"
                            loading={maintenanceLoading}
                        />
                        <span className="text-sm text-slate-600">
                            {maintenanceStatus ? 'Site is under maintenance' : 'Site is live'}
                        </span>
                    </div>
                </Space>
            </div>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                className="custom-tabs"
                tabBarExtraContent={
                    <Button
                        type="primary"
                        ghost
                        onClick={() => setShowBackupModal(true)}
                        icon={<DatabaseOutlined />}
                    >
                        Create Backup
                    </Button>
                }
            >
                {/* Profile Tab */}
                <TabPane tab={<Space><UserOutlined /> Profile</Space>} key="profile">
                    <Card className="shadow-2xl">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSave}
                            initialValues={settings.profile}
                        >
                            <Row gutter={32}>
                                <Col span={8}>
                                    <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                                        <Input prefix={<UserOutlined />} placeholder="Enter full name" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                                        <Input prefix={<MailOutlined />} placeholder="admin@hospitalcare.com" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="phone" label="Phone">
                                        <Input prefix={<PhoneOutlined />} placeholder="+91 9876543210" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={32}>
                                <Col span={12}>
                                    <Form.Item name="currentPassword" label="Current Password">
                                        <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="newPassword" label="New Password">
                                        <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Space className='mt-4 w-full! flex! justify-center!'>
                                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                        Update Profile
                                    </Button>
                                    <Button icon={<ReloadOutlined />} onClick={() => form.resetFields()}>
                                        Reset
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Card>
                </TabPane>

                {/* Hospital Tab */}
                <TabPane tab={<Space><EditOutlined /> Hospital</Space>} key="hospital">
                    <Row className='grid! grid-cols-1! md:grid-cols-3! gap-4!'>
                        <Card title="Hospital Information" className="shadow-xl! col-span-2!">
                            <Form layout="vertical">
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item label="Hospital Name">
                                            <Input placeholder="HospitalCare Medical Center" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Phone Number">
                                            <Input prefix={<PhoneOutlined />} placeholder="+91 9876543210" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Address">
                                            <TextArea rows={3} placeholder="123 Health St, Pune, Maharashtra 411001" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <Card title="Hospital Logo" className="shadow-xl! col-span-1! w-full!">
                            <div className="text-center mb-4">
                                <Avatar
                                    size={80}
                                    src={hospitalLogo || '/default-logo.png'}
                                    className="mx-auto shadow-2xl border-4 border-white"
                                    icon={<EditOutlined />}
                                />
                            </div>
                            <Dragger
                                name="logo"
                                multiple={false}
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={handleLogoUpload}
                                className="logo-uploader"
                            >
                                <p className="ant-upload-drag-icon">
                                    <EditOutlined />
                                </p>
                                <p>Click or drag logo (PNG/JPG, max 2MB)</p>
                            </Dragger>
                        </Card>
                    </Row>
                </TabPane>
            </Tabs>

            {/* Backup Modal */}
            <Modal
                title="Create Backup"
                open={showBackupModal}
                onCancel={() => setShowBackupModal(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShowBackupModal(false)}>
                        Cancel
                    </Button>,
                    <Button key="backup" type="primary" onClick={createBackup} loading={loading}>
                        Create & Download
                    </Button>
                ]}
            >
                <p>Creating a full backup of database and files. This may take 2-5 minutes.</p>
                <Alert message="Backups are stored securely for 30 days" type="info" showIcon />
            </Modal>
        </div>
    );
};

export default AdminSettings;