import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Tag, Statistic } from "antd";
import {
    EditOutlined, HeartOutlined, CalendarOutlined,
    ClockCircleOutlined, PhoneOutlined, StarFilled,
    BuildOutlined, UserOutlined,
    BulbOutlined,
    TeamOutlined,
    HeartFilled,
    TrophyOutlined
} from "@ant-design/icons";
import ScrollAnimated from "../../components/animations/ScrollAnimated";
import { GLOBAL_PATH } from "../../config";

const services = [
    {
        title: "Emergency Care",
        desc: "24/7 emergency services with rapid response teams and advanced life support.",
        tags: ["24/7 Available", "Ambulance", "ICU"],
        stats: "5000+ cases/year",
    },
    {
        title: "Cardiology",
        desc: "Comprehensive heart care from diagnosis to advanced surgical interventions.",
        tags: ["Angiography", "Bypass Surgery", "Pacemaker"],
        stats: "98% success rate",
    },
    {
        title: "Neurology",
        desc: "Advanced neurological care for stroke, epilepsy, and brain disorders.",
        tags: ["Stroke Unit", "EEG", "MRI Guided"],
        stats: "250+ specialists",
    },
    {
        title: "Orthopedics",
        desc: "Joint replacement, spine surgery, and sports injury treatments.",
        tags: ["Joint Replacement", "Spine Surgery", "Arthroscopy"],
        stats: "95% recovery rate",
    },
    {
        title: "Pediatrics",
        desc: "Complete childcare from newborn to adolescent with specialized care.",
        tags: ["NICU", "Vaccination", "Growth Clinic"],
        stats: "3200+ children/year",
    },
    {
        title: "Diagnostics",
        desc: "Fast and accurate lab tests, imaging, and pathology services.",
        tags: ["MRI/CT", "Blood Tests", "Same Day Results"],
        stats: "Results in 4hrs",
    },
    {
        title: "Oncology",
        desc: "Comprehensive cancer care including chemotherapy, radiation, and surgical oncology.",
        tags: ["Chemotherapy", "Radiation", "Immunotherapy"],
        stats: "90% 5-year survival",
        color: "orange",
    },
    {
        title: "Gastroenterology",
        desc: "Complete digestive health care from endoscopy to advanced liver treatments.",
        tags: ["Endoscopy", "Colonoscopy", "Liver Clinic"],
        stats: "2000+ procedures/year",
    },
    {
        title: "General Surgery",
        desc: "Laparoscopic and minimally invasive surgical procedures for various conditions.",
        tags: ["Laparoscopy", "Hernia Repair", "Appendectomy"],
        stats: "98% success rate",
    },
    {
        title: "Endocrinology",
        desc: "Diabetes management, thyroid disorders, and hormonal imbalance treatments.",
        tags: ["Diabetes Care", "Thyroid", "Hormone Therapy"],
        stats: "5000+ patients/year",
    },
    {
        title: "Psychiatry & Mental Health",
        desc: "Comprehensive mental health services including counseling and therapy.",
        tags: ["Counseling", "Therapy", "De-addiction"],
        stats: "95% recovery rate",
    },
    {
        title: "Nephrology",
        desc: "Kidney disease treatment including dialysis and transplant services.",
        tags: ["Dialysis", "Kidney Transplant", "Stone Treatment"],
        stats: "150+ transplants",
    },
];

const features = [
    {
        icon: TeamOutlined,
        title: "Expert Specialists",
        desc: "Highly qualified doctors with international training",
    },
    {
        icon: BuildOutlined,
        title: "Advanced Technology",
        desc: "Latest medical equipment for accurate diagnosis",
    },
    {
        icon: HeartFilled,
        title: "Complete Care",
        desc: "From diagnosis to treatment to recovery",
    },
    {
        icon: StarFilled,
        title: "Holistic Approach",
        desc: "Physical, mental, and emotional wellness",
    },
    {
        icon: UserOutlined,
        title: "Patient Support",
        desc: "Dedicated care coordinators for your journey",
    },
    {
        icon: TrophyOutlined,
        title: "Proven Success",
        desc: "95%+ patient satisfaction rate",
    },
]


const ServicesList = () => {
    const navigate = useNavigate()

    return (
        <div className="space-y-15 px-2 sm:px-12">
            {/* 1. Hero Section */}
            <ScrollAnimated delay={0}>
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                        Our <span className="text-teal-600">Services</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Comprehensive healthcare services with cutting-edge technology and expert care.
                    </p>
                </div>
            </ScrollAnimated>

            {/* 2. Services Grid */}
            <ScrollAnimated delay={0.2}>
                <Row gutter={[32, 32]}>
                    {services.map((service, index) => (
                        <Col xs={24} sm={12} lg={8} xl={8} key={index}>
                            <ScrollAnimated delay={0.3 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-full! md:h-70! lg:h-90! xl:h-70! shadow-lg! hover:shadow-2xl! hover:-translate-y-4! transition-all! duration-500! bg-linear-to-br! from-white! to-teal-50/50! backdrop-blur-sm! rounded-3xl! hover:border-2! hover:border-teal-300! hover:bg-teal-400! overflow-hidden!"
                                >
                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">{service.title}</h3>
                                        <p className="text-slate-600 mb-6 leading-relaxed text-center">{service.desc}</p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap mb-2 gap-2 justify-center">
                                            {service.tags.map((tag, i) => (
                                                <Tag
                                                    key={i}
                                                    color="teal"
                                                    className="font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow"
                                                >
                                                    {tag}
                                                </Tag>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-center p-2 bg-linear-to-r from-teal-50 to-cyan-50 rounded-2xl">
                                            <Statistic
                                                value={service.stats}
                                                valueStyle={{ color: "#14b8a6", fontSize: "1.25rem", fontWeight: 700 }}
                                                prefix={<StarFilled className="text-yellow-400! mr-1" />}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                </Row>
            </ScrollAnimated>


            {/* 3. Why Choose Our Services - ADD THIS */}
            <ScrollAnimated delay={0.7}>
                <div>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-slate-800 mb-16">
                            Why Choose Our <span className="text-teal-600">Services</span>
                        </h2>
                    </div>

                    <Row gutter={[40, 40]}>
                        {features.map((feature, index) => (
                            <Col xs={24} sm={12} lg={8} md={12} key={index}>
                                <ScrollAnimated delay={0.8 + index * 0.1}>
                                    <div className="px-8 text-center group hover:-translate-y-3 transition-all duration-500 cursor-pointer">
                                        <div className="w-24 h-24 bg-linear-to-r from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 group-hover:shadow-3xl transition-all duration-500 ring-4 ring-teal-100/50">
                                            <feature.icon className="text-3xl text-white! drop-shadow-lg!" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed px-4">{feature.desc}</p>
                                    </div>
                                </ScrollAnimated>
                            </Col>
                        ))}
                    </Row>
                </div>
            </ScrollAnimated>

            {/* 4. CTA */}
            <ScrollAnimated delay={1.0}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-6">
                        Need Expert Care?
                    </h2>
                    <p className="text-xl text-slate-600 mb-12">
                        Book an appointment with our specialists today
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                            className="px-12! py-4! text-xl! rounded-xl! shadow-lg!">
                            Schedule Appointment
                        </Button>
                        <Button
                            size="large"
                            type="primary"
                            ghost
                            onClick={() => navigate(`${GLOBAL_PATH}/doctors`)}
                            className="px-12 py-4 text-xl rounded-xl">
                            Meet Our Doctors
                        </Button>
                    </div>
                </div>
            </ScrollAnimated>
        </div>
    );
};

export default ServicesList;