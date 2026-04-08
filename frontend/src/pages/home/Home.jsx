import React from "react";
import { Card, Button, Statistic, Row, Col } from "antd";
import { PhoneOutlined, CalendarOutlined, UserOutlined, HeartOutlined, ClockCircleOutlined, EditOutlined, ArrowRightOutlined, StarFilled, WhatsAppOutlined, } from "@ant-design/icons";
import ScrollAnimated from "../../components/animations/ScrollAnimated";
import { GLOBAL_PATH } from "../../config";
import { useNavigate } from "react-router-dom";

const services = [
    { title: "Specialist Doctors", icon: <UserOutlined />, desc: "Top Specialists" },
    { title: "Emergency Care", icon: <HeartOutlined />, desc: "24/7 Emergency Services" },
    { title: "Appointment Booking", icon: <CalendarOutlined />, desc: "Online Booking System" },
    { title: "Lab & Diagnostics", icon: <ClockCircleOutlined />, desc: "Fast Results" },
];

const trackRecord = [
    { number: "15+", name: 'Years' },
    { number: "400+", name: 'Beds' },
    { number: "40+", name: 'Doctors' },
    { number: "98%", name: 'Success' }
]

const departments = [
    {
        title: 'Cardiology',
        desc: 'Heart and cardiovascular care',
        beds: '20+',
        icon: '/images/CardiologyDept.jpg',
    },
    {
        title: 'Pediatrics',
        desc: 'Children and infant care',
        beds: '25+',
        icon: '/images/PediatricsDept.jpg',
    },
    {
        title: 'Neurology',
        desc: 'Brain and nervous system',
        beds: '18+',
        icon: '/images/NeurologyDept.jpg',
    },
    {
        title: 'Obstetrics',
        desc: 'Maternity and delivery',
        beds: '30+',
        icon: '/images/ObstetricsDept.jpg',
    },
    {
        title: 'Orthopaedics',
        desc: 'Bone and joint specialists',
        beds: '15+',
        icon: '/images/OrthopaedicsDept.jpg',
    },
    {
        title: 'Oncology',
        desc: 'Cancer treatment center',
        beds: '22+',
        icon: '/images/OncologyDept.jpg',
    }
];

const doctors = [
    {
        name: 'Dr. Kishor Awasthi',
        speciality: 'Cardiology',
        experience: '18',
        ratings: '4.9',
        icon: '/images/KishorAwasthi.jpg',
    },
    {
        name: 'Dr. Kirti Patil',
        speciality: 'Orthopedics',
        experience: '15',
        ratings: '4.8',
        icon: '/images/KirtiPatil.jpg',
    },
    {
        name: 'Dr. Rohit Kalarkar',
        speciality: 'Neurology',
        experience: '20',
        ratings: '4.9',
        icon: '/images/RohitKalarkar.jpg',
    },
    {
        name: 'Dr. Ashwini Desai',
        speciality: 'Oncology',
        experience: '16',
        ratings: '4.8',
        icon: '/images/AshwiniDesai.jpg',
    },
]

const stats = [
    { duration: '24hrs', desc: 'Round-the-clock operation' },
    { duration: '15min', desc: 'Average diagnostic time' },
    { duration: '99.8%', desc: 'Equipment uptime guarantee' },
]


const Home = () => {
    const navigate = useNavigate()
    const { Meta } = Card;

    return (
        <div className="space-y-15 px-2 sm:px-20">
            {/* 1. Hero Section */}
            <ScrollAnimated delay={0} className="pt-20">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 truncate">
                    Welcome to <span className="text-teal-600">HospitalCare</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-xl mb-3">
                    Comprehensive healthcare management system with modern technology and expert care.
                </p>
                <div className="flex flex-wrap gap-2 w-full mb-8">
                    {trackRecord.map((record, index) => (
                        <div key={index} className="h-20 w-40 flex flex-col justify-center items-center bg-white border border-teal-300 transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:border-2 hover:border-teal-300 rounded-2xl shadow-2xl">
                            <span className="text-3xl font-bold text-teal-600">{record.number}</span> <span className="text-xs font-bold">{record.name}</span>
                        </div>
                    ))}
                </div>
                <div className="space-x-4">
                    <Button
                        onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                        size="large"
                        type="primary"
                        className="px-8! py-4! transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-110">
                        Book Appointment
                    </Button>
                    <Button
                        size="large"
                        type="primary"
                        ghost
                        className="px-8! py-4! transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-110">
                        Learn More
                    </Button>
                </div>
                <Button
                    type="text"
                    href="tel:+91XXXXXXXXXX"
                    className="mt-4 font-semibold! text-base! text-teal-600! transition-all duration-500 ease-in-out hover:shadow-2xl hover:translate-x-3"
                    onClick={() => window.location.href = "tel:+91XXXXXXXXXX"}
                >
                    Emergency: +91 XXXXXXXXXX
                </Button>
            </ScrollAnimated>

            {/* 2. Features Grid */}
            <ScrollAnimated delay={0.2}>
                <h2 className="text-4xl font-bold text-center text-slate-800 mb-16 truncate">
                    Why <span className="text-teal-600">Choose HospitalCare</span>
                </h2>
                <Row gutter={[32, 32]} justify="center">
                    {services.map((service, index) => (
                        <Col xs={24} sm={12} lg={6} key={index}>
                            <ScrollAnimated delay={0.3 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-full! shadow-lg! border-none! transition-all! duration-500! ease-in-out! hover:shadow-2xl! hover:-translate-y-2! hover:scale-105! cursor-pointer! bg-linear-to-br! from-white! to-teal-50!"
                                    cover={
                                        <div className="p-8 pb-0 text-center">
                                            <div className="w-full h-auto bg-teal-100 rounded-full flex items-center px-4 py-4 text-3xl text-teal-800">
                                                {service.icon}
                                            </div>
                                        </div>
                                    }
                                >
                                    <Meta title=<span className="text-xl">{service.title}</span> description={service.desc} />
                                    <Button
                                        type="text"
                                        className="mt-4 font-semibold! text-base! text-teal-600! transition-all duration-500 ease-in-out hover:shadow-2xl hover:translate-x-1"
                                    >
                                        Explore More <ArrowRightOutlined />
                                    </Button>
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                </Row>
            </ScrollAnimated>


            {/* 3. Deparment Grid */}
            <ScrollAnimated delay={0.2}>
                <div className="mb-14 flex flex-col items-center gap-2">
                    <h2 className="text-4xl font-bold text-center text-slate-800">
                        Our <span className="text-teal-600">Departments</span>
                    </h2>
                    <p className="text-base">Comprehensive medical specialties with expert doctors and advanced facilities</p>
                </div>
                <Row gutter={[32, 32]} justify="center">
                    {departments.map((dept, index) => (
                        <Col xs={24} sm={12} lg={8} key={index}>
                            <ScrollAnimated delay={0.3 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-full! shadow-lg! border-none! transition-all! duration-500! ease-in-out! hover:shadow-2xl! hover:-translate-y-2! hover:scale-105! cursor-pointer! bg-linear-to-br! from-white! to-teal-50!"
                                    cover={
                                        <div className="p-8 pb-0 text-center">
                                            <img
                                                src={dept.icon}
                                                alt={dept.title}
                                                className="w-full h-48 object-cover rounded-xl shadow-xl transition-all duration-500 hover:scale-110 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        </div>
                                    }
                                >
                                    <div className="space-y-1 text-md">
                                        <h1 className="text-xl font-bold">{dept.title}</h1>
                                        <div> {dept.desc} </div>
                                        <div className="text-teal-600 font-semibold flex items-center justify-between">
                                            <span>{dept.beds} Beds</span>
                                            <span className="bg-teal-100 px-1 py-1 rounded-xl text-xs">Specialized</span>
                                        </div>
                                    </div>
                                    <Button
                                        type="primary"
                                        ghost
                                        className="mt-4 px-2! py-1! font-semibold! text-base! text-teal-600! transition-all duration-500 ease-in-out hover:shadow-2xl hover:translate-x-1"
                                    >
                                        Learn More <ArrowRightOutlined />
                                    </Button>
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                    <ScrollAnimated delay={0.2}>
                        <Button
                            type="primary"
                            onClick={() => navigate(`${GLOBAL_PATH}/services/departments`)}
                            className="mt-4 px-5! py-6! rounded-2xl! font-semibold! text-base! transition-all duration-500 ease-in-out hover:shadow-2xl hover:translate-x-1 hover:scale-105!"
                        >
                            View All Departments <ArrowRightOutlined />
                        </Button>
                    </ScrollAnimated>
                </Row>
            </ScrollAnimated>

            {/* 4. Doctor Grid */}
            <ScrollAnimated delay={0.2}>
                <div className="mb-14 flex flex-col items-center gap-2">
                    <h2 className="text-4xl font-bold text-center text-slate-800">
                        Top <span className="text-teal-600">Doctors</span>
                    </h2>
                    <p className="text-base">Meet our most experienced and highly-rated specialists</p>
                </div>
                <Row gutter={[16, 24]} justify="center">
                    {doctors.map((dr, index) => (
                        <Col xs={24} sm={12} md={12} lg={6} key={index}>
                            <ScrollAnimated delay={0.3 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-full! shadow-lg! border-none! transition-all! duration-500! ease-in-out! hover:shadow-2xl! hover:-translate-y-2! hover:scale-105! cursor-pointer! bg-linear-to-br! from-white! to-teal-50!"
                                    cover={
                                        <div className="p-6 pb-0 relative overflow-hidden rounded-t-xl">
                                            <img
                                                src={dr.icon}
                                                alt={dr.name}
                                                className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-xl shadow-xl transition-all duration-500 hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute! top-3! right-3! bg-white/95! backdrop-blur-sm! px-3! py-1! rounded-full! shadow-xl!">
                                                <StarFilled className="text-yellow-500! text-sm! mr-1!" />
                                                <span className="font-bold text-slate-800 text-sm">{dr.ratings}</span>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="px-4 space-y-2">
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 truncate">{dr.name}</h3>
                                        <div className="text-teal-600 font-bold text-sm sm:text-base">{dr.speciality}</div>
                                        <div className="text-slate-600 text-sm">
                                            {dr.experience} Years Experience
                                        </div>
                                        <div className="flex! flex-col! sm:flex-row! justify-center! gap-2! pt-2">
                                            <Button
                                                // size="small"
                                                type="primary"
                                                className="w-full! sm:w-auto! px-4! py-2! font-semibold! transition-all! duration-500! hover:shadow-xl! hover:scale-105! text-sm!"
                                            >
                                                Profile
                                            </Button>
                                            <Button
                                                // size="small"
                                                type="primary"
                                                ghost
                                                onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                                                className="w-full! sm:w-auto! px-4! py-2! font-semibold! text-teal-600! transition-all! duration-500! hover:shadow-xl! hover:scale-105! text-sm!"
                                            >
                                                Book Now
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                </Row>
                <div className="flex justify-center mt-8">
                    <ScrollAnimated delay={0.2}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate(`${GLOBAL_PATH}/doctors`)}
                            className="px-8 py-6 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 bg-linear-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                        >
                            View All Doctors <ArrowRightOutlined />
                        </Button>
                    </ScrollAnimated>
                </div>
            </ScrollAnimated>


            {/* 6. CTA Section */}
            <ScrollAnimated delay={0.7} className="px-20 text-center">
                <h2 className="text-4xl font-bold text-slate-800 mb-6">
                    Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-slate-600 mb-12">
                    Book an appointment with our expert specialists today. Get immediate response, professional care, and personalized treatment plans designed for your wellness.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                        className="px-10! py-6! text-xl! transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105!">
                        Book Appointment Now
                        <span>{<ArrowRightOutlined />}</span>
                    </Button>
                    <Button
                        href="tel:+91XXXXXXXXXX"
                        size="large"
                        ghost
                        type="primary"
                        className="px-10! py-6! text-xl! transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105!">
                        <WhatsAppOutlined />
                        Chat on WhatsApp
                    </Button>
                </div>
            </ScrollAnimated>

            {/* 5. Trust Section */}

            <ScrollAnimated delay={0.8} className="text-center">
                <div className="text-center mb-8">
                    <h2 className="text-5xl md:text-6xl font-black text-trasparent mb-6 bg-linear-to-r from-slate-800 via-teal-800 to-blue-800 bg-clip-text text-transparent drop-shadow-2xl">
                        Trusted By Thousands
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Join 50,000+ patients and 200+ healthcare partners who trust HospitalCare for exceptional medical services.
                    </p>
                </div>
                {/* Trust Stats */}
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {[
                        { num: "50K+", label: "Happy Patients" },
                        { num: "200+", label: "Partners" },
                        { num: "98%", label: "Success Rate" },
                        { num: "24/7", label: "Support" }
                    ].map((stat, i) => (
                        <div key={i} className="group text-center p-8 bg-linear-to-b from-teal-50 to-blue-50/50 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-teal-100/50">
                            <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                                {stat.num}
                            </div>
                            <div className="text-lg font-semibold text-slate-700 leading-tight tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollAnimated>
        </div >
    );
};

export default Home;    