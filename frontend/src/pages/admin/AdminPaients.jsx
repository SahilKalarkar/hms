import React, { useState, useEffect } from 'react';
import {
    Card, Table, Button, Tag, Modal, Form, Input, Select, message, Row, Col, Space, Typography,
    Dropdown, Menu, Avatar, Badge, Skeleton
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, FilterOutlined,
    UserOutlined, PhoneOutlined, MailOutlined, CalendarOutlined, ReloadOutlined,
    IdcardOutlined, HeartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const { Title } = Typography;

const AdminPatients = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [viewPatient, setViewPatient] = useState(null);
    const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/patients');
            setPatients(res.data || []);
        } catch (err) {
            message.error('Failed to fetch patients');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Patient',
            key: 'patient',
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
                        }}
                    >
                        {record.name?.charAt(0)}
                    </Avatar>
                    <div className="font-semibold text-slate-800 text-sm">{record.name}</div>
                </div>
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
        // {
        //     title: 'Email',
        //     dataIndex: 'email',
        //     key: 'email',
        //     render: (email) => (
        //         <Tag color="cyan" className="px-3 py-1 rounded-full font-medium text-sm">
        //             {email}
        //         </Tag>
        //     )
        // },
        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     key: 'age',
        //     render: (age) => (
        //         <span className="font-medium text-slate-700">
        //             {age || 0} yrs
        //         </span>
        //     )
        // },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => (
                <Tag
                    color={gender === 'Male' ? 'blue' : 'pink'}
                    className="px-3 py-1 rounded-full font-medium"
                >
                    {gender || 'Not Specified'}
                </Tag>
            )
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${record.status === 'active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-700'
                    }`}>
                    {record.status?.toUpperCase() || 'INACTIVE'}
                </span>
            )
        },
        // {
        //     title: 'Visits',
        //     dataIndex: 'visits',
        //     key: 'visits',
        //     sorter: (a, b) => a.visits - b.visits,
        //     render: (count) => (
        //         <div className="text-center">
        //             <div className="text-xl font-bold text-teal-600">{count || 0}</div>
        //             <div className="text-xs text-slate-500">Total</div>
        //         </div>
        //     )
        // },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EyeOutlined />}
                        size="small"
                        className="p-0 text-teal-600 hover:text-teal-700"
                        onClick={() => openViewModal(record)}
                    />
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        className="p-0 text-blue-600 hover:text-blue-700"
                        onClick={() => editPatient(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        className="p-0"
                        onClick={() => deletePatient(record.id)}
                    />
                </Space>
            )
        }
    ];

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            patient.email?.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const openViewModal = (patient) => {
        setViewPatient(patient);
        setModalMode('view');
        setModalVisible(true);
    };

    const editPatient = (patient) => {
        setSelectedPatient(patient);
        form.setFieldsValue(patient);
        setModalMode('edit');
        setModalVisible(true);
    };

    const deletePatient = (id) => {
        Modal.confirm({
            title: 'Delete Patient?',
            content: 'This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            onOk: async () => {
                try {
                    await api.delete(`/admin/patients/${id}`);
                    message.success('Patient deleted successfully');
                    fetchPatients();
                } catch (err) {
                    message.error('Failed to delete patient');
                }
            }
        });
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleSubmit = async (values) => {
        try {
            if (modalMode === 'edit' && selectedPatient) {
                await api.put(`/admin/patients/${selectedPatient.id}`, values);
                message.success('Patient updated successfully');
            } else if (modalMode === 'add') {
                await api.post('/admin/patients', values);
                message.success('Patient added successfully');
            }
            setModalVisible(false);
            form.resetFields();
            setSelectedPatient(null);
            setViewPatient(null);
            setModalMode('add');
            fetchPatients();
        } catch (err) {
            message.error('Failed to save patient');
        }
    };

    const statusMenu = (
        <Menu>
            <Menu.Item key="all" onClick={() => setStatusFilter('all')}>
                All Status
            </Menu.Item>
            <Menu.Item key="active" onClick={() => setStatusFilter('active')}>
                Active
            </Menu.Item>
            <Menu.Item key="inactive" onClick={() => setStatusFilter('inactive')}>
                Inactive
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="space-y-4 p-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row lg:items-center justify-between gap-4">
                <div>
                    <div className="text-2xl font-bold bg-linear-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                        Patients
                    </div>
                    <div className="text-slate-600 font-medium">Manage patient records</div>
                </div>

                <Space className='flex! flex-wrap!'>
                    <Input
                        id="search"
                        placeholder="Search patients by name or email..."
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="rounded-xl w-full"
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="font-semibold shadow-lg hover:shadow-xl"
                        onClick={() => {
                            setModalMode('add');
                            setModalVisible(true);
                        }}
                    >
                        Add Patient
                    </Button>
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        className="rounded-xl bg-teal-500 hover:bg-teal-600"
                        onClick={fetchPatients}
                    />
                </Space>
            </div>

            {/* Patients Table */}
            <Card
                className="shadow-2xl border border-teal-100/50"
                bodyStyle={{ padding: 0 }}
                title={
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-linear-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                            <HeartOutlined className="text-white! text-lg!" />
                        </div>
                        All Patients ({filteredPatients.length})
                    </div>
                }
            >
                <div className="p-6">
                    <Table
                        columns={columns}
                        dataSource={filteredPatients}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 12,
                            size: 'small'
                        }}
                        scroll={{ x: 1000 }}
                        className="rounded-2xl overflow-hidden"
                        rowClassName="hover:bg-linear-to-r! hover:from-teal-50! hover:to-cyan-50! transition-all! cursor-pointer! hover:shadow-md!"
                    />
                </div>
            </Card>

            {/* SINGLE MODAL - VIEW/ADD/EDIT */}
            <Modal
                title={
                    <div className="flex items-center">
                        {modalMode === 'view' && (
                            <>
                                <IdcardOutlined className="text-teal-500! mr-2!" />
                                Patient Details
                            </>
                        )}
                        {modalMode === 'edit' && (
                            <>
                                <EditOutlined className="text-blue-500! mr-2!" />
                                Edit Patient
                            </>
                        )}
                        {modalMode === 'add' && (
                            <>
                                <PlusOutlined className="text-emerald-500! mr-2!" />
                                Add New Patient
                            </>
                        )}
                    </div>
                }
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setSelectedPatient(null);
                    setViewPatient(null);
                    setModalMode('add');
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                {modalMode === 'view' && viewPatient && (
                    <div>
                        <Row className='flex justify-evenly items-center' >
                            <Col>
                                <div className="text-center! p-6! bg-teal-50! rounded-2xl!">
                                    <Avatar
                                        className="shadow-lg border-4 border-white ring-2 ring-teal-100/50"
                                        size={40}
                                        style={{
                                            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}>
                                        {viewPatient.name?.charAt(0)}
                                    </Avatar>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{viewPatient.name}</h3>
                                    <Tag color="cyan" className="px-4 py-2 text-lg font-semibold">
                                        Patient ID: {viewPatient.id}
                                    </Tag>
                                </div>
                            </Col>
                            <Col>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-500 mb-1">Email</div>
                                        <div className="text-lg font-semibold text-slate-800">{viewPatient.email}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-500 mb-1">Phone</div>
                                        <div className="text-lg font-semibold text-slate-800">{viewPatient.phone}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="text-sm font-semibold text-slate-500 mb-1">Age</div>
                                            <div className="text-lg font-semibold text-slate-800">{viewPatient.age || 0} years</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-500 mb-1">Gender</div>
                                            <div className="text-lg font-semibold text-slate-800">{viewPatient.gender || 'Not Specified'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <div className="text-sm font-semibold text-slate-500 mb-1">Visits</div>
                                            <div className="text-lg font-bold text-teal-600">{viewPatient.visits || 0}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-500 mb-1">Status</div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${viewPatient.status === 'active'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {viewPatient.status?.toUpperCase() || 'INACTIVE'}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}

                {(modalMode === 'add' || modalMode === 'edit') && (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Row className='grid! grid-cols-1! sm:grid-cols-2! gap-x-2'>
                            <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                                <Input placeholder="John Doe" />
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                <Input placeholder="patient@example.com" />
                            </Form.Item>
                            <Form.Item name="phone" label="Phone">
                                <Input placeholder="+91 9876543210" />
                            </Form.Item>
                            <Form.Item name="age" label="Age">
                                <Input type="number" placeholder="25" />
                            </Form.Item>
                            <Form.Item name="gender" label="Gender">
                                <Select placeholder="Select gender" allowClear>
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="emergency_contact" label="Emergency Contact">
                                <Input placeholder="+91 9876543211" />
                            </Form.Item>
                        </Row>

                        <div className="flex justify-end mt-2">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="rounded-xl h-10 font-semibold"
                            >
                                {modalMode === 'edit' ? 'Update Patient' : 'Add Patient'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default AdminPatients;