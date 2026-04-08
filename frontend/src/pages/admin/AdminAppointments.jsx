import React, { useState, useEffect } from 'react';
import {
    Card, Table, Button, Tag, Modal, Form, Input, Select, message, Row, Col, Space, Typography,
    Dropdown, Menu, Avatar, Badge, DatePicker,
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, FilterOutlined,
    CalendarOutlined, PhoneOutlined, MailOutlined, UserOutlined, ReloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import api from '../../services/api';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const AdminAppointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [viewAppointment, setViewAppointment] = useState(null);
    const [modalMode, setModalMode] = useState('add');
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchDepartments = async () => {
        try {
            const res = await api.get('/admin/departments');
            setDepartments(res.data || []);
        } catch (err) {
            console.error('Failed to fetch departments');
        }
    };

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/appointments');
            setAppointments(res.data || []);
        } catch (err) {
            message.error('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAppointments();
        fetchDepartments();
    }, []);


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
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => (
                <div className="font-medium text-slate-800">
                    {dayjs(date).format('DD MMM YYYY')}
                </div>
            )
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => (
                <div className="text-sm text-teal-600 font-medium">{phone}</div>
            )
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${record.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    record.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                    {record.status?.toUpperCase() || 'PENDING'}
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
                    <Button icon={<EditOutlined />} size="small" className="p-0 text-blue-600 hover:text-blue-700" onClick={() => editAppointment(record)} />
                    <Button icon={<DeleteOutlined />} size="small" danger className="p-0" onClick={() => deleteAppointment(record.id)} />
                </Space>
            )
        }
    ];

    const filteredAppointments = appointments.filter(appointment => {
        const matchesSearch = appointment.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            appointment.email?.toLowerCase().includes(searchText.toLowerCase()) ||
            appointment.department?.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const openViewModal = (appointment) => {
        setViewAppointment(appointment);
        setModalMode('view');
        setModalVisible(true);
    };

    const editAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        form.setFieldsValue({
            ...appointment,
            department_id: appointment.department_id,
            date: dayjs(appointment.date)
        });
        setModalMode('edit');
        setModalVisible(true);
    };

    const deleteAppointment = (id) => {
        Modal.confirm({
            title: 'Delete Appointment?',
            content: 'This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            onOk: async () => {
                try {
                    await api.delete(`/admin/appointments/${id}`);
                    message.success('Appointment deleted');
                    fetchAppointments();
                } catch (err) {
                    message.error('Failed to delete');
                }
            }
        });
    };

    const handleSearch = (value) => setSearchText(value);

    const handleSubmit = async (values) => {
        try {
            const payload = {
                ...values,
                date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : null,
                department_id: values.department_id
            };
            if (modalMode === 'edit' && selectedAppointment) {
                await api.put(`/admin/appointments/${selectedAppointment.id}`, payload);
                message.success('Appointment updated');
            } else {
                await api.post('/admin/appointments', payload);
                message.success('Appointment added');
            }
            setModalVisible(false);
            form.resetFields();
            setSelectedAppointment(null);
            setViewAppointment(null);
            setModalMode('add');
            fetchAppointments();
        } catch (err) {
            message.error('Failed to save appointment');
        }
    };

    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col md:flex-row lg:items-center justify-between gap-4">
                <div>
                    <div className="text-2xl font-bold bg-linear-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                        Appointments
                    </div>
                    <div className="text-slate-600 font-medium">Manage appointment requests</div>
                </div>
                <Space className='flex! flex-wrap!'>
                    <Input
                        id="search"
                        placeholder="Search by name, email or department..."
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="rounded-xl w-full"
                    />
                    <Button type="primary" icon={<PlusOutlined />} className="font-semibold shadow-lg hover:shadow-xl" onClick={() => { setModalMode('add'); setModalVisible(true); }}>
                        Add Appointment
                    </Button>
                    <Button type="primary" icon={<ReloadOutlined />} className="rounded-xl bg-teal-500 hover:bg-teal-600" onClick={fetchAppointments} />
                </Space>
            </div>

            <Card className="shadow-2xl border border-teal-100/50" bodyStyle={{ padding: 0 }} title={
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-linear-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                        <CalendarOutlined className="text-white! text-lg!" />
                    </div>
                    All Appointments ({filteredAppointments.length})
                </div>
            }>
                <div className="p-6">
                    <Table
                        columns={columns}
                        dataSource={filteredAppointments}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 12, size: 'small' }}
                        scroll={{ x: 1000 }}
                        className="rounded-2xl! overflow-hidden!"
                        rowClassName="hover:bg-linear-to-r! hover:from-teal-50! hover:to-cyan-50! transition-all! cursor-pointer! hover:shadow-md!"
                    />
                </div>
            </Card>

            {/* SINGLE MODAL */}
            <Modal
                title={
                    <div className="flex items-center">
                        {modalMode === 'view' && <><CalendarOutlined className="text-teal-500! mr-2!" />Appointment Details</>}
                        {modalMode === 'edit' && <><EditOutlined className="text-blue-500! mr-2!" />Edit Appointment</>}
                        {modalMode === 'add' && <><PlusOutlined className="text-emerald-500! mr-2!" />New Appointment</>}
                    </div>
                }
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setSelectedAppointment(null);
                    setViewAppointment(null);
                    setModalMode('add');
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                {modalMode === 'view' && viewAppointment && (
                    <div>
                        <Row className='flex justify-evenly items-center gap-4'>
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
                                        {viewAppointment.name?.charAt(0)}
                                    </Avatar>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{viewAppointment.name}</h3>
                                    <Tag color="teal" className="px-4 py-2 text-lg font-semibold">
                                        {viewAppointment.department}
                                    </Tag>
                                </div>
                            </Col>
                            <Col>
                                <div className="space-y-4">
                                    <div><div className="text-sm font-semibold text-slate-500 mb-1">Email</div><div className="text-lg font-semibold">{viewAppointment.email}</div></div>
                                    <div><div className="text-sm font-semibold text-slate-500 mb-1">Phone</div><div className="text-lg font-semibold">{viewAppointment.phone}</div></div>
                                    <div><div className="text-sm font-semibold text-slate-500 mb-1">Date</div><div className="text-lg font-bold text-teal-600">{dayjs(viewAppointment.date).format('DD MMM YYYY')}</div></div>
                                    <div><div className="text-sm font-semibold text-slate-500 mb-1">Status</div>
                                        <Badge status={viewAppointment.status === 'confirmed' ? 'success' : 'default'}
                                            text={<span className={`px-3 py-1 rounded-full text-sm font-semibold ${viewAppointment.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>{viewAppointment.status?.toUpperCase()}</span>} />
                                    </div>
                                    {viewAppointment.message && (
                                        <div>
                                            <div className="text-sm font-semibold text-slate-500 mb-2">Message</div>
                                            <div className="p-4 bg-gray-50 rounded-xl text-slate-700">{viewAppointment.message}</div>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}

                {(modalMode === 'add' || modalMode === 'edit') && (
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Row className='grid! grid-cols-1! sm:grid-cols-2! gap-x-4!'>
                            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter name' }]}>
                                <Input placeholder="Full Name" className="rounded-xl" />
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true, message: 'Please enter valid email' }]}>
                                <Input placeholder="Email" className="rounded-xl" />
                            </Form.Item>
                            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter phone' }]}>
                                <Input placeholder="Phone" className="rounded-xl" />
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

                            <Form.Item name="date" label="Appointment Date" rules={[{ required: true, message: 'Please select date' }]}>
                                <DatePicker className="w-full rounded-xl" placeholder="Appointment Date" format='DD-MM-YYYY' />
                            </Form.Item>
                            <Form.Item name="message" label='Message'>
                                <Input rows={4} placeholder="Message (optional)" className="rounded-xl" />
                            </Form.Item>
                        </Row>
                        <div className="flex justify-end mt-6 space-x-3">
                            <Button type="primary" htmlType="submit" className="rounded-xl h-10 font-semibold">Save Appointment</Button>
                        </div>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default AdminAppointments;