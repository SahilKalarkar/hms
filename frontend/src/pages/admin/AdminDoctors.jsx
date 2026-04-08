import React, { useState, useEffect } from 'react';
import {
    Card, Table, Button, Tag, Modal, Form, Input, Select, message, Row, Col, Space, Typography,
    Avatar,
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined,
    UserOutlined, PhoneOutlined, ReloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const { Title } = Typography;

const AdminDoctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);  // ✅ NEW
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [viewDoctor, setViewDoctor] = useState(null);
    const [modalMode, setModalMode] = useState('add');
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');  // ✅ CHANGED

    useEffect(() => {
        fetchDoctors();
        fetchDepartments();  // ✅ NEW
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/doctors');
            setDoctors(res.data || []);
        } catch (err) {
            message.error('Failed to fetch doctors');
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {  // ✅ NEW
        try {
            const res = await api.get('/admin/departments');
            setDepartments(res.data || []);
        } catch (err) {
            console.error('Failed to fetch departments');
        }
    };

    const columns = [
        {
            title: 'Doctor',
            key: 'doctor',
            width: 200,
            render: (_, record) => (
                <div className="flex items-center gap-2">
                    <Avatar
                        className="shadow-lg border-4 border-white ring-2 ring-teal-100/50"
                        size={40}
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                        {record.name?.charAt(0)}
                    </Avatar>
                    <div className="font-semibold text-slate-800 text-sm">{record.name}</div>
                </div>
            )
        },
        {
            title: 'Department',
            key: 'department',
            render: (_, record) => (
                <Tag color="teal" className="px-3 py-1 rounded-full font-medium">
                    {record.department_name || 'General'}
                </Tag>
            )
        },
        {
            title: 'Contact',
            key: 'contact',
            render: (_, record) => (
                <div className="flex items-center text-sm">
                    <PhoneOutlined className="mr-1 text-teal-500" />
                    {record.phone}
                </div>
            )
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
            render: (years) => (
                <span className="font-medium text-slate-700">
                    {years || 0} yrs
                </span>
            )
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                    {record.status?.toUpperCase() || 'INACTIVE'}
                </span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} size="small" className="p-0 text-teal-600 hover:text-teal-700" onClick={() => openViewModal(record)} />
                    <Button icon={<EditOutlined />} size="small" className="p-0 text-blue-600 hover:text-blue-700" onClick={() => editDoctor(record)} />
                    <Button icon={<DeleteOutlined />} size="small" danger className="p-0" onClick={() => deleteDoctor(record.id)} />
                </Space>
            )
        }
    ];

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            doctor.email?.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
        const matchesDepartment = departmentFilter === 'all' || doctor.department_id == departmentFilter;  // ✅ CHANGED
        return matchesSearch && matchesStatus && matchesDepartment;
    });

    const openViewModal = (doctor) => {
        setViewDoctor(doctor);
        setModalMode('view');
        setModalVisible(true);
    };

    const editDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        form.setFieldsValue({
            name: doctor.name,
            department_id: doctor.department_id || null,
            email: doctor.email || '',
            phone: doctor.phone || '',
            experience: doctor.experience || 0
        });
        setModalMode('edit');
        setModalVisible(true);
    };

    const deleteDoctor = (id) => {
        Modal.confirm({
            title: 'Delete Doctor?',
            content: 'This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            onOk: async () => {
                try {
                    await api.delete(`/admin/doctors/${id}`);
                    message.success('Doctor deleted successfully');
                    fetchDoctors();
                } catch (err) {
                    message.error('Failed to delete doctor');
                }
            }
        });
    };

    const handleSearch = (value) => setSearchText(value);

    const handleSubmit = async (values) => {
        try {
            const cleanValues = {
                name: values.name || '',
                department_id: values.department_id || null,
                email: values.email || null,
                phone: values.phone || null,
                experience: values.experience || 0
            };

            if (modalMode === 'edit' && selectedDoctor) {
                await api.put(`/admin/doctors/${selectedDoctor.id}`, cleanValues);
                message.success('Doctor updated successfully');
            } else {
                await api.post('/admin/doctors', cleanValues);
                message.success('Doctor added successfully');
            }
            setModalVisible(false);
            form.resetFields();
            setSelectedDoctor(null);
            setViewDoctor(null);
            setModalMode('add');
            fetchDoctors();
        } catch (err) {
            message.error('Failed to save doctor');
        }
    };

    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col md:flex-row lg:items-center justify-between gap-4">
                <div>
                    <div className="text-2xl font-bold bg-linear-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                        Doctors
                    </div>
                    <div className="text-slate-600 font-medium">Manage your medical staff</div>
                </div>
                <Space className='flex flex-wrap'>
                    <Input
                        placeholder="Search doctors by name or email..."
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="rounded-xl w-full"
                    />
                    <Button type="primary" icon={<PlusOutlined />} className="font-semibold shadow-lg hover:shadow-xl"
                        onClick={() => { setModalMode('add'); setModalVisible(true); }}>
                        Add Doctor
                    </Button>
                    <Button type="primary" icon={<ReloadOutlined />} className="rounded-xl bg-teal-500 hover:bg-teal-600" onClick={fetchDoctors} />
                </Space>
            </div>

            <Card className="shadow-2xl border border-teal-100/50" bodyStyle={{ padding: 0 }} title={
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-linear-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                        <UserOutlined className="text-white! text-lg!" />
                    </div>
                    All Doctors ({filteredDoctors.length})
                </div>
            }>
                <div className="p-6">
                    <Table
                        columns={columns}
                        dataSource={filteredDoctors}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 12, size: 'small' }}
                        scroll={{ x: 1000 }}
                        className="rounded-2xl overflow-hidden"
                        rowClassName="hover:bg-linear-to-r hover:from-teal-50 hover:to-cyan-50 transition-all cursor-pointer hover:shadow-md"
                    />
                </div>
            </Card>

            <Modal
                title={
                    <div className="flex items-center">
                        {modalMode === 'view' && (<><UserOutlined className="text-teal-500! mr-2!" />Doctor Details</>)}
                        {modalMode === 'edit' && (<><EditOutlined className="text-blue-500! mr-2!" />Edit Doctor</>)}
                        {modalMode === 'add' && (<><PlusOutlined className="text-emerald-500! mr-2!" />Add New Doctor</>)}
                    </div>
                }
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setSelectedDoctor(null);
                    setViewDoctor(null);
                    setModalMode('add');
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                {modalMode === 'view' && viewDoctor && (
                    <div>
                        <Row className='flex justify-evenly items-center'>
                            <Col>
                                <div className="text-center p-6 bg-teal-50 rounded-2xl">
                                    <Avatar
                                        className="shadow-lg border-4 border-white ring-2 ring-teal-100/50"
                                        size={40}
                                        style={{
                                            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}>
                                        {viewDoctor.name?.charAt(0)}
                                    </Avatar>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{viewDoctor.name}</h3>
                                    <Tag color="teal" className="px-4 py-2 text-lg font-semibold">
                                        {viewDoctor.department_name || 'General'}
                                    </Tag>
                                </div>
                            </Col>
                            <Col>
                                <div className="space-y-4">
                                    <div><div className="text-sm font-semibold text-slate-500 mb-1">Email</div><div className="text-lg font-semibold">{viewDoctor.email}</div></div>
                                    <div><div className="text-sm font-semibold text-slate-500 mb-1">Phone</div><div className="text-lg font-semibold">{viewDoctor.phone}</div></div>
                                    <div className="flex items-center gap-4">
                                        <div><div className="text-sm font-semibold text-slate-500 mb-1">Experience</div><div className="text-lg font-semibold">{viewDoctor.experience || 0} years</div></div>
                                    </div>
                                    <div><div className="text-sm font-semibold text-slate-500 mb-1">Status</div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${viewDoctor.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                                            {viewDoctor.status?.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}

                {(modalMode === 'add' || modalMode === 'edit') && (
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Row className="grid! grid-cols-1! sm:grid-cols-2! gap-x-2!">
                            <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                                <Input placeholder="Dr. John Doe" />
                            </Form.Item>
                            <Form.Item name="department_id" label="Department" rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Select department"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    className="rounded-xl">
                                    {departments.map(dept => (
                                        <Select.Option key={dept.id} value={dept.id} label={dept.name}>
                                            {dept.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                <Input placeholder="doctor@example.com" />
                            </Form.Item>
                            <Form.Item name="phone" label="Phone">
                                <Input placeholder="+91 9876543210" />
                            </Form.Item>
                            <Form.Item name="experience" label="Experience (years)">
                                <Input type="number" placeholder="5" />
                            </Form.Item>
                        </Row>
                        <div className="flex justify-end mt-2">
                            <Button type="primary" htmlType="submit" className="rounded-xl h-10 font-semibold">
                                {modalMode === 'edit' ? 'Update Doctor' : 'Add Doctor'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default AdminDoctors;