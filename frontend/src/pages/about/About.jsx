
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Timeline, Statistic, Row, Col, Divider } from "antd";
import {
    TrophyOutlined, UserOutlined, CalendarOutlined,
    StarFilled, HeartOutlined, TeamOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";
import ScrollAnimated from "../../components/animations/ScrollAnimated";
import StarRating from "../../components/rating/StarRating"; // if you created it
import { GLOBAL_PATH } from "../../config";

const journey = [
    { year: "2015", desc: "HospitalCare founded with 50 beds and 10 specialist doctors." },
    { year: "2018", desc: "Accredited by NABH. Expanded to 200 beds." },
    { year: "2020", desc: "Launched telemedicine during pandemic. Served 50K+ patients." },
    { year: "2024", desc: "Digital transformation complete. 500+ beds, 100+ specialists." },
    { year: "2026", desc: "AI diagnostics launched. Future of healthcare." },
]

const experts = [
    {
        name: "Dr. Kishor Awasthi",
        specialty: "Cardiologist",
        rating: 4.9,
        icon: '/images/KishorAwasthi.jpg',
    },
    {
        name: "Dr. Rohit Kalarkar",
        specialty: "Neurologist",
        rating: 4.8,
        icon: '/images/RohitKalarkar.jpg',
    },
    {
        name: "Dr. Ashwini Desai",
        specialty: "Oncologist",
        rating: 4.9,
        icon: '/images/AshwiniDesai.jpg',
    },
    {
        name: "Dr. Kirti Patil",
        specialty: "Orthopedist",
        rating: 4.7,
        icon: '/images/KirtiPatil.jpg',
    },
]

const reasons = [
    {
        icon: CalendarOutlined,
        title: "Easy Appointments",
        desc: "Book appointments online 24/7. No more waiting in queues.",
        color: "teal"
    },
    {
        icon: HeartOutlined,
        title: "24/7 Emergency",
        desc: "Round the clock emergency services with rapid response teams.",
        color: "red"
    },
    {
        icon: StarFilled,
        title: "Expert Doctors",
        desc: "Board-certified specialists with decades of experience.",
        color: "yellow"
    },
    {
        icon: ClockCircleOutlined,
        title: "Fast Results",
        desc: "Advanced diagnostics with results in hours, not days.",
        color: "blue"
    },
]

const About = () => {
    const navigate = useNavigate()
    const { Meta } = Card;

    return (
        <div className="space-y-15 px-2 sm:px-20">
            {/* 1. Hero Section */}
            <section className="text-center">
                <ScrollAnimated delay={0}>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                        About <span className="text-teal-600">Hospital Care</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Founded in 2015, HospitalCare has been serving communities with excellence in healthcare.
                        Our mission is to provide accessible, high‑quality medical services with compassion.
                    </p>
                    <div className="flex gap-4 flex-wrap items-center justify-center">
                        <Button
                            onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                            size="large"
                            type="primary"
                            className="px-8! py-6! transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-110">
                            Schedule Appointment
                        </Button>
                        <Button
                            size="large"
                            type="primary"
                            ghost
                            className="px-8! py-6! transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:scale-110">
                            Learn More
                        </Button>
                    </div>
                </ScrollAnimated>
            </section>

            {/* 2. Journey Timeline */}
            <section>
                <ScrollAnimated delay={0.2}>
                    <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">
                        Our <span className="text-teal-600">Journey</span>
                    </h2>
                </ScrollAnimated>

                <div className="relative max-w-2xl mx-auto">
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-linear-to-b from-teal-300 to-cyan-300" />
                    <div className="space-y-16">
                        {journey.map((item, index) => (
                            <ScrollAnimated key={item.year} delay={0.3 + index * 0.1}>
                                <div className={`${index % 2 === 0 ? "md:flex md:justify-end" : "flex flex-col"}`}>
                                    <div className={`md:w-5/12 p-6 rounded-2xl shadow-xl border border-teal-200 bg-linear-to-r from-teal-100 to-cyan-100 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}>
                                        <div className="flex items-center justify-center mb-4">
                                            <h3 className="text-3xl font-bold text-slate-800 mr-4">{item.year}</h3>
                                            <div className={`w-12 h-12 rounded-full bg-${item.color}-500 flex items-center justify-center shadow-lg`}>
                                                <div className={`w-6 h-6 bg-white rounded-full shadow-md`} />
                                            </div>
                                        </div>
                                        <p className="text-lg text-slate-700 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </ScrollAnimated>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Our Team */}
            <section>
                <ScrollAnimated delay={0.4}>
                    <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">
                        Meet <span className="text-teal-600"> Our Experts</span>
                    </h2>
                </ScrollAnimated>
                <Row gutter={[32, 32]} justify="center">
                    {experts.map((doctor, index) => (
                        <Col xs={24} sm={12} lg={6} key={index}>
                            <ScrollAnimated delay={0.5 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-full! shadow-lg! border-none! transition-all! duration-500! ease-in-out! hover:shadow-2xl! hover:-translate-y-3! bg-linear-to-br! from-white! to-teal-50!"
                                    cover={
                                        <div className="relative h-20 bg-linear-to-r from-teal-100 to-cyan-100 rounded-t-xl! flex! items-center! justify-center!">
                                            <div className="absolute bottom-5 w-24 h-24 bg-teal-200 rounded-full border-4 border-white shadow-lg flex! items-center! justify-center!">
                                                <img
                                                    src={doctor.icon}
                                                    alt={doctor.title}
                                                    className="w-full h-full object-cover rounded-full shadow-xl transition-all duration-500 hover:scale-110 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    }
                                >
                                    <Meta
                                        title={
                                            <div className="flex flex-col items-center">
                                                <span className="font-bold text-slate-800">{doctor.name}</span>
                                                <StarRating rating={doctor.rating} size={14} />
                                            </div>
                                        }
                                        description={<span className="text-teal-600 font-semibold">{doctor.specialty}</span>}
                                    />
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                </Row>
            </section>

            {/* 4. CTA Section */}
            <section className="text-center">
                <ScrollAnimated delay={1.0}>
                    <h2 className="text-4xl font-bold text-slate-800 mb-6">
                        Ready to Experience Excellence?
                    </h2>
                    <p className="text-xl text-slate-600 mb-12">
                        Join thousands of satisfied patients who trust HospitalCare.
                    </p>
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                        className="px-12 py-4 text-xl">
                        Book Your Appointment
                    </Button>
                    <Button
                        size="large"
                        type="primary"
                        ghost
                        onClick={() => navigate(`${GLOBAL_PATH}/services/list`)}
                        className="px-12 py-4 text-xl ml-3 mt-2 sm:mt-0">
                        Explore Our Services
                    </Button>
                </ScrollAnimated>
            </section>
        </div>
    );
};

export default About;   