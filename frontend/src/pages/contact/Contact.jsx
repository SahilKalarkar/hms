// frontend/src/pages/contact/Contact.jsx
import React, { useEffect, useState } from "react";
import { Card, Button, Form, Input, Select, Row, Col, Divider, DatePicker, message } from "antd";
import {
    PhoneOutlined, MailOutlined, EnvironmentOutlined,
    ClockCircleOutlined, CalendarOutlined, MessageOutlined,
    UserOutlined
} from "@ant-design/icons";
import ScrollAnimated from "../../components/animations/ScrollAnimated";
import api from "../../services/api";

const { TextArea } = Input;
const { Option } = Select;

const Contact = () => {
    const [form] = Form.useForm();

    const [departments, setDepartments] = useState([]);

    const fetchDepartments = async () => {
        try {
            const res = await api.get('/public/departments');
            setDepartments(res.data);
        } catch (err) {
            message.error('Failed to load departments');
        }
    };


    useEffect(() => {
        fetchDepartments();
    }, []);


    const onFinish = async (values) => {
        try {
            const res = await api.post('/public/appointments', values);
            message.success('Appointment booked successfully! We will contact you soon.');
            form.resetFields();
        } catch (err) {
            message.error(err.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <div className="space-y-15 px-2 sm:px-20">
            {/* 1. Hero */}
            <ScrollAnimated delay={0.3}>
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                        Contact <span className="text-teal-600">Us</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Get in touch with us. Our team is here to answer your questions.
                    </p>
                </div>
            </ScrollAnimated>

            {/* 2. Contact Info Cards */}
            <ScrollAnimated delay={[0.3]}>
                <Row className="grid! grid-cols-1! sm:grid-cols-2! lg:grid-cols-4! gap-4">
                    {/* Phone */}
                    <Card
                        hoverable
                        className="h-full! shadow-xl! hover:shadow-2xl! transition-all! duration-500! bg-linear-to-br! from-teal-50! to-cyan-50! backdrop-blur-sm! rounded-3xl! border! border-teal-100/50!"
                    >
                        <div className="w-12 h-12 bg-teal-200 text-teal-600 rounded-2xl flex justify-center shadow-2xl">
                            <PhoneOutlined className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Phone</h3>
                        <a href="tel:+91 XXXXXXXXXX" className="block text-lg font-bold text-teal-600 hover:text-teal-700">
                            +91 XXXXXXXXXX
                        </a>
                    </Card>

                    {/* Email */}
                    <Card
                        hoverable
                        className="h-full! shadow-xl! hover:shadow-2xl! transition-all! duration-500! bg-linear-to-br! from-teal-50! to-cyan-50! backdrop-blur-sm! rounded-3xl! border! border-teal-100/50!"
                    >
                        <div className="w-12 h-12 bg-teal-200 text-teal-600 rounded-2xl flex justify-center shadow-2xl">
                            <MailOutlined className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Email</h3>
                        <a
                            href="mailto:info@premiumhospital.com"
                            className="block text-lg font-semibold text-slate-700 hover:text-teal-600 break-all"
                        >
                            info@hospitalCare.com
                        </a>
                    </Card>

                    {/* Location */}
                    <Card
                        hoverable
                        className="h-full! shadow-xl! hover:shadow-2xl! transition-all! duration-500! bg-linear-to-br! from-teal-50! to-cyan-50! backdrop-blur-sm! rounded-3xl! border! border-teal-100/50!"
                    >
                        <div className="w-12 h-12 bg-teal-200 text-teal-600 rounded-2xl flex justify-center shadow-2xl">
                            <EnvironmentOutlined className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Location</h3>
                        <p className="text-lg font-semibold text-slate-800 mb-2">Kalyan, Maharashtra</p>
                    </Card>

                    {/* Hours */}
                    <Card
                        hoverable
                        className="h-full! shadow-xl! hover:shadow-2xl! transition-all! duration-500! bg-linear-to-br! from-teal-50! to-cyan-50! backdrop-blur-sm! rounded-3xl! border! border-teal-100/50!"
                    >
                        <div className="w-12 h-12 bg-teal-200 text-teal-600 rounded-2xl flex justify-center shadow-2xl">
                            <ClockCircleOutlined className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Hours</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center text-teal-700">
                                <ClockCircleOutlined className="mr-2" />
                                <span>24/7 Emergency</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <ClockCircleOutlined className="mr-2" />
                                <span>OPD: 9 AM - 9 PM</span>
                            </div>
                        </div>
                    </Card>
                </Row>
            </ScrollAnimated>

            {/* 3. Appointment Form */}
            <ScrollAnimated delay={0.5}>
                <div >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">
                            Book Your <span className="text-teal-600">Appointment</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Fill the form below and our team will confirm your appointment
                        </p>
                    </div>

                    <Row className="grid! space-y-8! items-center! justify-center!">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            className="bg-white/80! backdrop-blur-sm! rounded-3xl! p-8! shadow-2xl! border! border-teal-100/50!"
                        >
                            <Row className="grid! grid-cols-1! sm:grid-cols-2! gap-x-4!">
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
                            </Row>

                            <Form.Item name="date" label="Appointment Date" rules={[{ required: true, message: 'Please select date' }]}>
                                <DatePicker className="w-full rounded-xl" placeholder="Appointment Date" format='DD-MM-YYYY' />
                            </Form.Item>

                            <Form.Item name="message" label='Message'>
                                <TextArea
                                    rows={4}
                                    placeholder="Message (optional)"
                                    className="rounded-xl"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    className="rounded-xl text-xl py-6 shadow-xl hover:shadow-2xl font-semibold"
                                >
                                    Send Appointment Request
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="h-full flex flex-col justify-center">
                            <Card className="shadow-2xl! bg-linear-to-br! from-teal-600! to-cyan-600! text-white! h-full! rounded-3xl!">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                        <PhoneOutlined className="text-3xl text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">Medical Emergency?</h3>
                                    <p className="text-teal-100 text-xl mb-8">Call our emergency hotline immediately</p>
                                </div>

                                <a
                                    href="tel:+91 XXXXXXXXXX"
                                    className="block! w-full! bg-white/20! backdrop-blur-sm! text-white! text-2xl! font-bold! py-8! px-12! rounded-3xl! text-center! hover:bg-white/30! transition-all! duration-300! shadow-2xl! hover:shadow-3xl! transform! hover:scale-[1.02]! border-2! border-white/30!"
                                >
                                    📞 Call: +91 XXXXXXXXXX
                                </a>
                            </Card>
                        </div>
                    </Row>
                </div>
            </ScrollAnimated >
        </div >
    );
};

export default Contact;