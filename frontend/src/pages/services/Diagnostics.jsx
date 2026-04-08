// frontend/src/pages/services/Diagnostics.jsx
import React from "react";
import { Card, Button, Row, Col, Statistic, Divider, Tag } from "antd";
import {
    ScanOutlined, BgColorsOutlined,
    FileTextOutlined, HeartOutlined, DatabaseOutlined,
    MobileOutlined, BulbOutlined, PhoneOutlined, CalendarOutlined,
    ClockCircleOutlined,
    StarFilled,
    UserOutlined
} from "@ant-design/icons";
import ScrollAnimated from "../../components/animations/ScrollAnimated";
import { useNavigate } from "react-router-dom";
import { GLOBAL_PATH } from "../../config";

const equipment = [
    {
        title: "3D MRI Machine",
        icon: '/images/mri.jpg',
        features: ["64-slice imaging", "Real-time monitoring", "Pediatric settings"],
        desc: "High-resolution imaging for detailed brain and body scans",
        color: "blue",
    },
    {
        title: "CT Scanner",
        icon: '/images/ctscanner.jpg',
        features: ["256-detector array", "Low radiation dose", "Fast scanning"],
        desc: "Advanced computed tomography for emergency diagnostics",
        color: "purple",
    },
    {
        title: "Ultrasound Suite",
        icon: '/images/ultrasound.jpg',
        features: ["Fetal imaging", "Cardiac doppler", "Abdominal scanning"],
        desc: "Color doppler ultrasound with 4D capabilities",
        color: "cyan",
    },
    {
        title: "Laboratory",
        icon: '/images/lab.jpg',
        features: ["Automated analyzers", "Rapid results", "All tests available"],
        desc: "State-of-the-art pathology and blood analysis",
        color: "emerald",
    },
    {
        title: "ECG",
        icon: '/images/ecg.jpg',
        features: ["12-lead ECG", "24hr holter monitoring", "Stress testing"],
        desc: "Advanced cardiac diagnostic equipment",
        color: "yellow",
    },
    {
        title: "Blood Bank",
        icon: '/images/blood.jpg',
        features: ["All blood groups", "Cross-matching", "Component therapy"],
        desc: "Modern blood storage and transfusion services",
        color: "orange",
    },
];

const category = [
    {
        title: "Imaging Services",
        services: ["X-Ray", "CT Scan", "MRI", "Ultrasound", "3D Imaging", "Interventional Radiology"],
        icon: ScanOutlined,
    },
    {
        title: "Laboratory Tests",
        services: ["Blood tests", "Biochemistry", "Microbiology", "Genetics", "Tissue analysis", "Serology"],
        icon: FileTextOutlined,
    },
    {
        title: "Cardiac Services",
        services: ["ECG", "Echocardiography", "Stress testing", "Holter monitoring", "Cardiac catheterization"],
        icon: HeartOutlined,
    },
]

const features = [
    { icon: ClockCircleOutlined, title: "Fast Results", desc: "Quick turnaround time for diagnostic reports" },
    { icon: StarFilled, title: "High Accuracy", desc: "Precision diagnosis with minimal errors" },
    { icon: DatabaseOutlined, title: "Digital Records", desc: "Complete digital archiving and easy access" },
    { icon: MobileOutlined, title: "Mobile Access", desc: "Online reports accessible anytime" },
    { icon: BulbOutlined, title: "AI Analysis", desc: "AI-assisted diagnosis for better accuracy" },
    { icon: UserOutlined, title: "Patient Friendly", desc: "Comfortable and easy diagnostic procedures" },
]

const Diagnostics = () => {
    const navigate = useNavigate()

    return (
        <div className="space-y-15 px-2 sm:px-20">
            {/* 1. Hero */}
            <ScrollAnimated delay={0}>
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                        Diagnostic <span className="text-teal-600">Equipment</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Latest technology for precise diagnosis
                    </p>
                </div>
            </ScrollAnimated>

            {/* 2. Equipment Cards */}
            <ScrollAnimated delay={0.2}>
                <Row gutter={[32, 32]}>
                    {equipment.map((equip, index) => (
                        <Col xs={24} sm={12} lg={8} xl={8} key={index}>
                            <ScrollAnimated delay={0.3 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-full! shadow-lg! hover:shadow-2xl! hover:-translate-y-4! transition-all! duration-500! bg-linear-to-br! from-white! to-teal-50/50! backdrop-blur-sm! rounded-3xl! border! border-teal-200! hover:bg-teal-400!"
                                >
                                    <div className="w-28 h-28 mx-auto bg-linear-to-r from-teal-500 to-cyan-500 rounded-full border-6 border-white shadow-2xl flex items-center justify-center">
                                        <img
                                            src={equip.icon}
                                            alt={equip.title}
                                            className="w-full h-full object-cover rounded-full shadow-xl transition-all duration-500 hover:scale-110 group-hover:scale-110"
                                            loading="lazy"
                                        /> </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">{equip.title}</h3>
                                    <p className="text-slate-600 mb-6 text-center">{equip.desc}</p>
                                    <div className="space-y-2 mb-8">
                                        {equip.features.map((feature, i) => (
                                            <div key={i} className="flex items-center text-slate-700">
                                                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 shrink-0" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                </Row>
            </ScrollAnimated>

            {/* 3. Service Categories */}
            <ScrollAnimated delay={0.7}>
                <ScrollAnimated delay={0}>
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                            Diagnostic <span className="text-teal-600">Services</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Comprehensive testing and analysis
                        </p>
                    </div>
                </ScrollAnimated>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {category.map((category, index) => (
                        <ScrollAnimated key={index} delay={0.8 + index * 0.1}>
                            <Card
                                className="h-full! shadow-xl! hover:shadow-2xl! transition-all! duration-300! bg-linear-to-br! from-white! to-teal-50/50! backdrop-blur-sm! rounded-3xl! border! border-teal-200! hover:bg-teal-400!"
                                bodyStyle={{ padding: "24px" }}
                            >
                                <div className="flex items-center mb-6">
                                    <category.icon className="text-3xl! text-teal-600! mr-4! shrink-0!" />
                                    <h3 className="text-2xl font-bold text-slate-800">{category.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {category.services.map((service, i) => (
                                        <li key={i} className="flex items-center text-slate-700">
                                            <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 shrink-0" />
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </ScrollAnimated>
                    ))}
                </div>
            </ScrollAnimated>

            {/* 4. Specialized Tests */}
            <ScrollAnimated delay={1.0}>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8">Specialized Tests</h2>
                    <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
                        {[
                            "Endoscopy", "Colonoscopy", "PFT", "EEG",
                            "Audiometry", "Vision testing"
                        ].map((test, index) => (
                            <Tag
                                key={index}
                                color="teal"
                                className="text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                            >
                                {test}
                            </Tag>
                        ))}
                    </div>
                </div>
            </ScrollAnimated>

            {/* 5. Technology Features */}
            <ScrollAnimated delay={0.3}>
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-slate-800 mb-6">Technology Features</h2>
                        <p className="text-xl text-slate-600">Benefits of our advanced systems</p>
                    </div>

                    <Row gutter={[40, 40]}>
                        {features.map((feature, index) => (
                            <Col xs={24} sm={12} lg={8} key={index}>
                                <ScrollAnimated delay={0.3 + index * 0.1}>
                                    <div className="px-8 text-center hover:-translate-y-2 transition-all duration-300 group">
                                        <div className="w-20 h-20 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110">
                                            <feature.icon className="text-2xl! text-white!" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                                        <p className="text-slate-600">{feature.desc}</p>
                                    </div>
                                </ScrollAnimated>
                            </Col>
                        ))}
                    </Row>
                </div>
            </ScrollAnimated>

            {/* 6. CTA */}
            <ScrollAnimated delay={0.3}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-6">Book Your Diagnostic Test</h2>
                    <p className="text-xl text-slate-600 mb-12">Schedule your diagnostic appointment with our expert team</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                            className="px-12! py-4! text-xl! rounded-xl! shadow-lg!">
                            Book Now
                        </Button>
                        <Button
                            size="large"
                            type="primary"
                            ghost
                            className="px-12! py-4! text-xl! rounded-xl!">
                            Get Pricing
                        </Button>
                    </div>
                </div>
            </ScrollAnimated>
        </div>
    );
};

export default Diagnostics;