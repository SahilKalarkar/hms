import React, { useState, useEffect } from 'react';
import {
    Card, Table, Button, Tag, Modal, Form, Input, message, Row, Col, Space, Typography,
    Dropdown, Menu, Avatar, Badge,
    Select
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, ReloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const { Title } = Typography;

const AdminDepartments = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [viewDepartment, setViewDepartment] = useState(null);
    const [modalMode, setModalMode] = useState('add');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/departments');
            setDepartments(res.data || []);
        } catch (err) {
            message.error('Failed to fetch departments');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Department',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (
                <div className="font-bold! text-lg! text-slate-800 capitalize">{name}</div>
            )
        },
        {
            title: 'Doctors',
            dataIndex: 'doctor_count',
            key: 'doctor_count',
            render: (count) => (
                <div className="pl-2">
                    <div className="text-xl font-bold text-teal-600 pl-4">{count || 0}</div>
                    <div className="text-xs text-slate-500">Assigned</div>
                </div>
            )
        },
        // {
        //     title: 'Appointments',
        //     dataIndex: 'appointment_count',
        //     key: 'appointment_count',
        //     render: (count) => (
        //         <div className="text-center">
        //             <div className="text-xl font-bold text-blue-600">{count || 0}</div>
        //             <div className="text-xs text-slate-500">This Month</div>
        //         </div>
        //     )
        // },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Tag color={record.status === 'active' ? 'green' : 'default'} className="px-3 py-1 rounded-full font-semibold">
                    {record.status?.toUpperCase()}
                </Tag>

            )
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} size="small" className="p-0 text-teal-600 hover:text-teal-700" onClick={() => openViewModal(record)} />
                    <Button icon={<EditOutlined />} size="small" className="p-0 text-blue-600 hover:text-blue-700" onClick={() => editDepartment(record)} />
                    <Button icon={<DeleteOutlined />} size="small" danger className="p-0" onClick={() => deleteDepartment(record.id)} />
                </Space>
            )
        }
    ];

    const filteredDepartments = departments.filter(dept =>
        dept.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    const openViewModal = (department) => {
        setViewDepartment(department);
        setModalMode('view');
        setModalVisible(true);
    };

    const editDepartment = (department) => {
        setSelectedDepartment(department);
        form.setFieldsValue({
            name: department.name,
            status: department.status
        });
        setModalMode('edit');
        setModalVisible(true);
    };

    const deleteDepartment = (id) => {
        Modal.confirm({
            title: 'Delete Department?',
            content: 'Doctors and appointments will remain but lose department reference.',
            okText: 'Delete',
            okType: 'danger',
            onOk: async () => {
                try {
                    await api.delete(`/admin/departments/${id}`);
                    message.success('Department deleted');
                    fetchDepartments();
                } catch (err) {
                    message.error('Failed to delete');
                }
            }
        });
    };

    const handleSearch = (value) => setSearchText(value);

    const handleSubmit = async (values) => {
        try {
            if (modalMode === 'edit' && selectedDepartment) {
                await api.put(`/admin/departments/${selectedDepartment.id}`, values);
                message.success('Department updated');
            } else {
                await api.post('/admin/departments', values);
                message.success('Department created');
            }
            setModalVisible(false);
            form.resetFields();
            setSelectedDepartment(null);
            setViewDepartment(null);
            setModalMode('add');
            fetchDepartments();
        } catch (err) {
            message.error('Failed to save department');
        }
    };

    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col md:flex-row lg:items-center justify-between gap-4">
                <div>
                    <div className="text-2xl font-bold bg-linear-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                        Departments
                    </div>
                    <div className="text-slate-600 font-medium">Manage hospital departments</div>
                </div>
                <Space className='flex! flex-wrap! gap-2!'>
                    <Input
                        id="search"
                        placeholder="Search departments..."
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="rounded-xl w-full"
                    />
                    <Button type="primary" icon={<PlusOutlined />} className="font-semibold shadow-lg hover:shadow-xl" onClick={() => { setModalMode('add'); setModalVisible(true); }}>
                        Add Department
                    </Button>
                    <Button type="primary" icon={<ReloadOutlined />} className="rounded-xl bg-teal-500 hover:bg-teal-600" onClick={fetchDepartments} />
                </Space>
            </div>

            <Card className="shadow-2xl border border-teal-100/50" bodyStyle={{ padding: 0 }} title={
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-linear-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                        <EditOutlined className="text-white! text-lg!" />
                    </div>
                    All Departments ({filteredDepartments.length})
                </div>
            }>
                <div className="p-6">
                    <Table
                        columns={columns}
                        dataSource={filteredDepartments}
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
                        {modalMode === 'view' && <><EyeOutlined className="text-teal-500! mr-2!" />Department Details</>}
                        {modalMode === 'edit' && <><EditOutlined className="text-blue-500! mr-2!" />Edit Department</>}
                        {modalMode === 'add' && <><PlusOutlined className="text-emerald-500! mr-2!" />New Department</>}
                    </div>
                }
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setSelectedDepartment(null);
                    setViewDepartment(null);
                    setModalMode('add');
                    form.resetFields();
                }}
                footer={null}
                width={modalMode === 'view' ? 300 : 600}
            >
                {modalMode === 'view' && viewDepartment && (
                    <div className="text-center space-y-2 p-4">
                        <h1 className="text-3xl font-bold text-slate-800 capitalize mb-2">{viewDepartment.name}</h1>
                        <div className="w-fit mx-auto text-center p-4 bg-teal-50 rounded-3xl">
                            <div className="text-2xl font-bold text-teal-600 mb-1">{viewDepartment.doctor_count || 0}</div>
                            <div className="text-sm text-slate-600 font-medium">Doctors</div>
                        </div>
                        <Badge status={viewDepartment.status === 'active' ? 'success' : 'default'}
                            text={<Tag color="green" className="px-4 py-2 text-lg font-bold">{viewDepartment.status?.toUpperCase()}</Tag>} />
                    </div>
                )}

                {(modalMode === 'add' || modalMode === 'edit') && (
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Row className='grid! grid-cols-2! gap-4!'>
                            <Form.Item name="name" label="Department Name" rules={[{ required: true, message: 'Department name required' }]}>
                                <Input placeholder="Cardiology" className="rounded-xl" />
                            </Form.Item>
                            <Form.Item name="status" label="Status" initialValue="active">
                                <Select className="rounded-xl">
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="inactive">Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                        </Row>
                        <div className="flex justify-end mt-6 space-x-3">
                            <Button type="primary" htmlType="submit" className="rounded-xl h-10 font-semibold">
                                {modalMode === 'edit' ? 'Update Department' : 'Create Department'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default AdminDepartments;