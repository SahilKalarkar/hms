// frontend/src/pages/services/PatientCare.jsx
import React from "react";
import { Card, Button, Row, Col, Steps, Statistic, Divider, Tag, Timeline } from "antd";
import {
    HomeOutlined, AppleOutlined, UserOutlined,
    HeartOutlined, WifiOutlined, PhoneOutlined,
    GoldenFilled, WomanOutlined,
    MedicineBoxOutlined, CalendarOutlined, BookOutlined,
    EditOutlined,
    StarFilled
} from "@ant-design/icons";
import ScrollAnimated from "../../components/animations/ScrollAnimated";
import { useNavigate } from "react-router-dom";
import { GLOBAL_PATH } from "../../config";

const features = [
    {
        icon: HomeOutlined,
        title: "Comfortable Rooms",
        desc: "Private and semi-private rooms with modern amenities and 24/7 monitoring",
    },
    {
        icon: AppleOutlined,
        title: "Nutritional Care",
        desc: "Customized meal plans designed by our nutrition specialists",
    },
    {
        icon: UserOutlined,
        title: "Continue Nursing",
        desc: "Dedicated nursing staff available 24/7 for patient care",
    },
    {
        icon: HeartOutlined,
        title: "Wellness Programs",
        desc: "Yoga, meditation, and fitness programs for recovery",
    },
    {
        icon: WifiOutlined,
        title: "Family Support",
        desc: "Comfortable waiting areas and accommodation for family members",
    },
    {
        icon: PhoneOutlined,
        title: "Discharge Support",
        desc: "Complete guidance and aftercare instructions for home recovery",
    },
]

const steps = [
    { title: "Pre-Admission", desc: "Complete pre-admission procedures and consultations with specialists", icon: CalendarOutlined, number: "01" },
    { title: "Admission & Assessment", desc: "Comprehensive health assessment and personalized treatment planning", icon: UserOutlined, number: "02" },
    { title: "Treatment & Care", desc: "Specialized treatment with continuous monitoring and support", icon: HeartOutlined, number: "03" },
    { title: "Recovery Support", desc: "Rehabilitation and wellness programs to aid recovery", icon: HomeOutlined, number: "04" },
    { title: "Discharge", desc: "Complete discharge with aftercare instructions and follow-up planning", icon: PhoneOutlined, number: "05" },
]

const amenity = [
    { icon: WifiOutlined, title: "WiFi Access" },
    { icon: PhoneOutlined, title: "Phone Services" },
    { icon: HomeOutlined, title: "AC/Temperature Control" },
    { icon: StarFilled, title: "LED TV & Entertainment" },
    { icon: BookOutlined, title: "Reading Materials" },
    { icon: AppleOutlined, title: "Tea & Coffee" },
    { icon: UserOutlined, title: "Attached Bathrooms" },
    { icon: HeartOutlined, title: "Recreation Facilities" },
]

const program = [
    {
        title: "Pediatric Care",
        icon: EditOutlined,
        features: ["Child-friendly environment", "Play therapy", "Parent accommodation", "Specialized pediatricians"],
    },
    {
        title: "Geriatric Care",
        icon: GoldenFilled,
        features: ["Specialized elderly care", "Mobility assistance", "Regular health monitoring", "Memory care programs"],
    },
    {
        title: "Maternity Care",
        icon: WomanOutlined,
        features: ["Labor & delivery suites", "Prenatal classes", "Postpartum recovery", "Neonatal care"],
    },
    {
        title: "ICU Care",
        icon: MedicineBoxOutlined,
        features: ["Advanced life support", "24/7 monitoring", "Expert intensivists", "Family support"],
    },
]

const PatientCare = () => {
    const navigate = useNavigate()

    return (
        <div className="space-y-15 px-2 sm:px-12">
            {/* 1. Hero */}
            <ScrollAnimated delay={0}>
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                        Our <span className="text-teal-600">Care Services</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Everything you need for optimal recovery
                    </p>
                </div>
            </ScrollAnimated>

            {/* 2. Care Features */}
            <ScrollAnimated delay={0.2}>
                <Row gutter={[32, 32]}>
                    {features.map((feature, index) => (
                        <Col xs={24} sm={12} lg={8} key={index}>
                            <ScrollAnimated delay={0.3 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-full! shadow-lg! hover:shadow-2xl! hover:-translate-y-3! transition-all! duration-500! bg-linear-to-br! from-white! to-teal-50/50! backdrop-blur-sm! rounded-3xl! border! border-teal-200! hover:bg-teal-400!"
                                >
                                    <div className="flex items-center mb-6">
                                        <div className="w-20 h-20 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                                            <feature.icon className="text-2xl! text-white!" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800">{feature.title}</h3>
                                            <p className="text-slate-600 mt-2">{feature.desc}</p>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                </Row>
            </ScrollAnimated>

            {/* 3. Patient Journey - Horizontal Steps */}
            <ScrollAnimated delay={0.7}>
                <div className="relative overflow-hidden">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-slate-800 mb-6">Your Patient Journey</h2>
                        <p className="text-xl text-slate-600">From admission to recovery</p>
                    </div>

                    {/* Steps */}
                    <div className="relative z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        {steps.map((step, index) => (
                            <ScrollAnimated key={index} delay={0.8 + index * 0.1}>
                                <div className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-4 ${index === 2 ? "order-last lg:order-0" : ""}`}>
                                    {/* Step circle */}
                                    <div className={`w-24 h-24 rounded-3xl flex flex-col items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl group-hover:ring-8 ring-teal-200/50 transition-all duration-700 z-20 relative`}>
                                        <step.icon className={`text-3xl mb-1 text-teal-600!`} />
                                        <span className={`text-sm font-bold text-teal-600 tracking-wide`}>
                                            {step.number}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className={`p-6 rounded-2xl transition-all duration-500 group-hover:bg-teal-50/80 backdrop-blur-sm bg-white/70 border border-teal-100/30 shadow-lg`}>
                                        <h4 className={`text-xl font-bold mb-3text-slate-800`}>
                                            {step.title}
                                        </h4>
                                        <p className={`text-slate-600 leading-relaxed`}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            </ScrollAnimated>
                        ))}
                    </div>
                </div>
            </ScrollAnimated>

            {/* 4. Hospital Amenities */}
            <ScrollAnimated delay={1.2}>
                <div>
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-slate-800 mb-8">Hospital Amenities</h2>
                        <p className="text-xl text-slate-600 mb-16">Everything for your comfort</p>
                    </div>

                    <Row gutter={[32, 32]}>
                        {amenity.map((amenity, index) => (
                            <Col xs={12} sm={8} lg={6} xl={6} key={index}>
                                <ScrollAnimated delay={0.3 + Math.floor(index / 2) * 0.1}>
                                    <div className="p-6 text-center border border-teal-100/50 rounded-2xl hover:bg-teal-50 hover:shadow-md transition-all duration-300 group cursor-pointer">
                                        <div className="w-16 h-16 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110">
                                            <amenity.icon className="text-xl! text-white!" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-lg">{amenity.title}</h4>
                                    </div>
                                </ScrollAnimated>
                            </Col>
                        ))}
                    </Row>
                </div>
            </ScrollAnimated>

            {/* 5. Special Care Programs */}
            <ScrollAnimated delay={0.3}>
                <div>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-slate-800 mb-8">Special Care Programs</h2>
                        <p className="text-xl text-slate-600">Specialized support for specific needs</p>
                    </div>

                    <Row className="grid! grid-cols-1! md:grid-cols-2! xl:grid-cols-4! gap-8!">
                        {program.map((program, index) => (
                            <ScrollAnimated delay={0.3 + index * 0.1}>
                                <Card
                                    key={index}
                                    className="shadow-xl! border! border-teal-200! bg-linear-to-br! from-white! to-teal-50/50! backdrop-blur-sm! hover:-translate-y-4! hover:bg-teal-400! hover:shadow-2xl! transition-all! duration-300! h-full!"
                                    hoverable
                                >
                                    <div className="flex items-center mb-6">
                                        <div className="px-5 py-5 bg-linear-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                                            <program.icon className="text-2xl! text-white!      " />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800">{program.title}</h3>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {program.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <div className="w-6 h-6 bg-teal-400 rounded-full shrink-0 mt-1 mr-3" />
                                                <span className="text-slate-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </ScrollAnimated>
                        ))}
                    </Row>
                </div>
            </ScrollAnimated>

            {/* 6. CTA */}
            <ScrollAnimated delay={0.3}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-800 mb-6">
                        Ready for Your Care Journey?
                    </h2>
                    <p className="text-xl text-slate-600 mb-12">Contact our team today to discuss your treatment and care plan</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="large"
                            type="primary"
                            onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                            className="px-12! py-4! text-xl! rounded-xl! shadow-lg!">
                            Book Appointment
                        </Button>
                        <Button
                            size="large"
                            type="primary"
                            ghost
                            className="px-12! py-4! text-xl! rounded-xl!">
                            Learn More
                        </Button>
                    </div>
                </div>
            </ScrollAnimated>
        </div>
    );
};

export default PatientCare;