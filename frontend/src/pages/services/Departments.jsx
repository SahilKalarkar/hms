import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Statistic, Divider } from "antd";
import {
    EditOutlined, TeamOutlined, BuildOutlined,
    BulbOutlined, CodeOutlined, HeartFilled,
    CalendarOutlined, UserOutlined
} from "@ant-design/icons";
import ScrollAnimated from "../../components/animations/ScrollAnimated";
import { GLOBAL_PATH } from "../../config";

const departments = [
    {
        name: "Cardiology",
        specialists: "Dr. Sarah Johnson, Dr. Emily Davis",
        services: ["Heart bypass", "Angioplasty", "Pacemaker"],
        beds: "120",
        color: "red",
    },
    {
        name: "Neurology",
        specialists: "Dr. Michael Chen, Dr. Raj Patel",
        services: ["Brain surgery", "Spine surgery", "Stroke care"],
        beds: "85",
        color: "purple",
    },
    {
        name: "Pediatrics",
        specialists: "Dr. Priya Sharma, Dr. Lisa Wong",
        services: ["Child healthcare", "Neonatal care", "Pediatric surgery"],
        beds: "75",
        color: "pink",
    },
    {
        name: "Orthopedics",
        specialists: "Dr. Ahmed Khan, Dr. Maria Lopez",
        services: ["Joint replacement", "Fracture repair", "Spine surgery"],
        beds: "95",
        color: "blue",
    },
    {
        name: "Oncology",
        specialists: "Dr. David Kim, Dr. Aisha Rahman",
        services: ["Chemotherapy", "Radiation therapy", "Surgical oncology"],
        beds: "110",
        color: "orange",
    },
    {
        name: "Gynecology",
        specialists: "Dr. Sophia Lee, Dr. Fatima Ali",
        services: ["Childbirth", "C-section", "High-risk pregnancy"],
        beds: "130",
        color: "teal",
    },
    {
        name: "Emergency",
        specialists: "Dr. James Carter, Dr. Elena Ruiz",
        services: ["Trauma care", "Emergency surgery", "Cardiac emergencies"],
        beds: "60",
        color: "yellow",
    },
    {
        name: "Pulmonology",
        specialists: "Dr. Thomas Brown, Dr. Nadia Khan",
        services: ["Lung cancer surgery", "COPD treatment", "Asthma management"],
        beds: "65",
        color: "indigo",
    },
    {
        name: "Nephrology",
        specialists: "Dr. Laura Garcia, Dr. Vikram Desai",
        services: ["Dialysis", "Kidney transplant", "Kidney disease"],
        beds: "55",
        color: "cyan",
    },
    {
        name: "Urology",
        specialists: "Dr. Kevin Patel, Dr. Sana Malik",
        services: ["Prostate surgery", "Kidney stones", "Bladder cancer"],
        beds: "50",
        color: "lime",
    },
];

const features = [
    {
        icon: TeamOutlined,
        title: "Expert Team",
        desc: "Board-certified specialists with years of experience in their fields",
    },
    {
        icon: BuildOutlined,
        title: "Modern Infrastructure",
        desc: "State-of-the-art facilities and equipment for optimal treatment",
    },
    {
        icon: BulbOutlined,
        title: "Research & Innovation",
        desc: "Continuous research and adoption of latest treatment methods",
    },
    {
        icon: CodeOutlined,
        title: "Multidisciplinary Approach",
        desc: "Collaboration between departments for comprehensive care",
    },
    {
        icon: HeartFilled,
        title: "Proven Success Rates",
        desc: "High success rates and excellent patient outcomes",
    },
    {
        icon: UserOutlined,
        title: "Patient-Centric Care",
        desc: "Personalized treatment plans tailored to each patient",
    },
]

const stats = [
    { number: '6+', title: 'Specialized Departments' },
    { number: '225', title: 'Expert Doctors' },
    { number: '1000+', title: 'Total Beds' },
    { number: '100,000+', title: 'Patients Treated' },
]

const Departments = () => {

    const navigate = useNavigate()

    return (
        <div className="space-y-15 px-2 sm:px-20">
            {/* 1. Heading */}
            <ScrollAnimated delay={0}>
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 truncate">
                        Our <span className="text-teal-600">Departments</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Specialized departments equipped with latest technology and expert care.
                    </p>
                </div>
            </ScrollAnimated>

            {/* 2. Department Cards */}
            <ScrollAnimated delay={0.2}>
                <Row gutter={[32, 32]}>
                    {departments.map((dept, index) => (
                        <Col xs={24} sm={12} lg={6} xl={6} key={index}>
                            <ScrollAnimated delay={0.3 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-95! shadow-lg! hover:shadow-2xl! hover:-translate-y-4! transition-all! duration-500! bg-linear-to-br! from-white! to-teal-50/50! backdrop-blur-sm! rounded-3xl! border! border-teal-200! hover:bg-teal-400! overflow-hidden!"
                                >
                                    {/* Content */}
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold text-slate-800 mb-4 text-center">{dept.name}</h3>

                                        {/* Specialists */}
                                        <div className="flex flex-col gap-1 w-full">
                                            <p className="text-sm text-teal-600 font-medium">Leading Specialists</p>
                                            <p className="font-semibold text-sm bg-teal-50 rounded-xl">
                                                {dept.specialists}
                                            </p>
                                        </div>

                                        {/* Services */}
                                        <div className="flex flex-col">
                                            <p className="text-sm text-teal-600 font-medium">Services</p>
                                            <div className="space-y-1">
                                                {dept.services.map((service, i) => (
                                                    <div key={i} className="flex items-center text-slate-700">
                                                        <div className="w-2 h-2 bg-teal-400 rounded-full mr-3" />
                                                        {service}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Beds */}
                                        <div className="flex flex-col">
                                            <p className="text-sm text-teal-600 font-medium">Dedicated Beds</p>
                                            <span>{dept.beds} Beds Available</span>
                                        </div>

                                        {/* Button */}
                                        <Button
                                            block
                                            type="primary"
                                            size="large"
                                            className="rounded-xl! shadow-lg! hover:shadow-xl! font-semibold! py-4! text-lg!"
                                        >
                                            Learn More
                                        </Button>
                                    </div>
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                </Row>
            </ScrollAnimated>

            {/* 3. Why Choose Our Departments */}
            <ScrollAnimated delay={0.6}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">
                        Why Choose Our Departments ?
                    </h2>
                    <Row gutter={[40, 40]}>
                        {features.map((feature, index) => (
                            <Col xs={24} sm={12} lg={8} md={12} key={index}>
                                <div className="px-8 text-center hover:-translate-y-2 transition-all duration-300 group">
                                    <div className="w-20 h-20 bg-linear-to-r! from-teal-500! to-cyan-500! rounded-2xl! flex! items-center! justify-center! mx-auto! mb-6! shadow-xl! group-hover:scale-110! transition-all! duration-300!">
                                        <feature.icon className="text-2xl! text-white!" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </ScrollAnimated>

            {/* 4. Department Statistics */}
            <ScrollAnimated delay={0.8}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-8">Department Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stats, index) => (
                            <div key={index} className="h-20 w-auto flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-teal-600"> {stats.number}</span>
                                <span className="text-sm font-bold">{stats.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollAnimated>

            {/* 5. CTA Section */}
            <ScrollAnimated delay={1.0}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-6">
                        Need a Specialist?
                    </h2>
                    <p className="text-xl text-slate-600 mb-12">
                        Choose the right department for your healthcare needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                            className="px-12 py-4 text-xl rounded-xl shadow-lg">
                            <CalendarOutlined className="mr-2" />
                            Book Appointment
                        </Button>
                        <Button size="large" type="primary" ghost className="px-12 py-4 text-xl rounded-xl">
                            <UserOutlined className="mr-2" />
                            Find a Doctor
                        </Button>
                    </div>
                </div>
            </ScrollAnimated>
        </div>
    );
};

export default Departments;