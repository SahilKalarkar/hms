import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Tag, Rate, Divider } from "antd";
import {
    UserOutlined, StarFilled, CalendarOutlined,
    HeartOutlined, EditOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import ScrollAnimated from "../../components/animations/ScrollAnimated";
import StarRating from "../../components/rating/StarRating";
import { GLOBAL_PATH } from "../../config";

const Doctors = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("all");

    const specialties = [
        { key: "all", label: "All Doctors" },
        { key: "cardiology", label: "Cardiology" },
        { key: "neurology", label: "Neurology" },
        { key: "pediatrics", label: "Pediatrics" },
        { key: "oncology", label: "Oncologist" },
        { key: "orthopedics", label: "Orthopedics" },
    ];

    const doctors = [
        {
            id: 1,
            name: "Dr. Kishor Awasthi",
            specialty: "cardiology",
            rating: 4.9,
            experience: "15+ years",
            qualifications: "MBBS, MD, DM Cardiology",
            patients: 2500,
            avatar: "KA",
            icon: '/images/KishorAwasthi.jpg',
        },
        {
            id: 2,
            name: "Dr. Rohit Kalarkar",
            specialty: "neurology",
            rating: 4.8,
            experience: "12+ years",
            qualifications: "MBBS, MD Neurology",
            patients: 1800,
            avatar: "RK",
            icon: '/images/RohitKalarkar.jpg',
        },
        {
            id: 3,
            name: "Dr. Ashwini Desai",
            specialty: "oncology",
            rating: 4.9,
            experience: "15+ years",
            qualifications: "MBBS, MD Oncology",
            patients: 2100,
            avatar: "AD",
            icon: '/images/AshwiniDesai.jpg',
        },
        {
            id: 4,
            name: "Dr. Kirti Patil",
            specialty: "orthopedics",
            rating: 4.7,
            experience: "18+ years",
            qualifications: "MBBS, MS Orthopedics",
            patients: 2100,
            avatar: "KP",
            icon: '/images/KirtiPatil.jpg',
        },
        {
            id: 5,
            name: "Dr. Priya Sharma",
            specialty: "pediatrics",
            rating: 4.9,
            experience: "10+ years",
            qualifications: "MBBS, DNB Pediatrics",
            patients: 3200,
            avatar: "PS",
            icon: '/images/PriyaSharma.jpg',
        },
        {
            id: 6,
            name: "Dr. Emily Davis",
            specialty: "cardiology",
            rating: 4.9,
            experience: "11+ years",
            qualifications: "MBBS, DM Cardiology",
            patients: 1900,
            avatar: "ED",
            icon: '/images/EmilyDavis.jpg',
        },
    ];

    const filteredDoctors = activeTab === "all"
        ? doctors
        : doctors.filter(doctor => doctor.specialty === activeTab);

    return (
        <div className="space-y-15 px-2 sm:px-20">
            {/* Heading */}
            <ScrollAnimated delay={0}>
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
                        Meet Our <span className="text-teal-600">Doctors</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Our team of highly qualified specialists provides world-class healthcare.
                    </p>
                </div>
            </ScrollAnimated>

            {/* Specialty Tabs */}
            <ScrollAnimated delay={0.2}>
                <div className="flex flex-wrap gap-3 justify-center mb-16">
                    {specialties.map((tab) => (
                        <Button
                            key={tab.key}
                            type={activeTab === tab.key ? "primary" : "default"}
                            className={`rounded-full! px-6! py-3! font-semibold! transition-all! duration-300! hover:shadow-md! ${activeTab === tab.key
                                ? "shadow-lg! scale-105!"
                                : "hover:scale-105! hover:shadow-lg!"
                                }`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </ScrollAnimated>

            {/* Doctors Grid */}
            <ScrollAnimated delay={0.4}>
                <Row className="grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-3! gap-6!">
                    {filteredDoctors.map((doctor, index) => (
                        <Col key={doctor.id}>
                            <ScrollAnimated delay={0.5 + index * 0.1}>
                                <Card
                                    hoverable
                                    className="h-full! shadow-lg! hover:shadow-2xl! hover:-translate-y-4! transition-all! duration-500! bg-linear-to-br! from-white! to-teal-50/50! backdrop-blur-sm! rounded-2xl! border! border-teal-200! hover:bg-teal-400!"
                                    cover={
                                        <div className="h-auto bg-linear-to-br from-teal-100 via-cyan-100 to-teal-200 rounded-t-2xl flex! flex-col items-center! justify-center! py-4!">
                                            <div className="w-28 h-28 bg-linear-to-r from-teal-500 to-cyan-500 rounded-full border-6 border-white shadow-2xl flex items-center justify-center">
                                                <img
                                                    src={doctor.icon}
                                                    alt={doctor.title}
                                                    className="w-full h-full object-cover rounded-full shadow-xl transition-all duration-500 hover:scale-110 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-between items-center gap-2 mb-4">
                                                <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
                                                {/* Specialty */}
                                                <Tag color="teal" className="font-semibold px-4 py-2 mb-4 text-lg">
                                                    {doctor.specialty.charAt(0).toUpperCase() + doctor.specialty.slice(1)}
                                                </Tag>

                                                <div className="flex items-center">
                                                    <StarRating rating={doctor.rating} size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="px-6">
                                        {/* Experience */}
                                        <div className="flex flex-col mb-2 text-slate-600">
                                            Experience:<span className="font-bold">{doctor.experience}</span>
                                        </div>

                                        {/* Qualifications */}
                                        <div className="mb-2">
                                            <p className="text-sm text-slate-500 font-medium mb-1">Qualifications:</p>
                                            <p className="text-slate-700 font-semibold">{doctor.qualifications}</p>
                                        </div>

                                        {/* Patients */}
                                        <div className="flex flex-col text-slate-600 mb-6">
                                            <span>
                                                <UsergroupAddOutlined className="mr-2 text-teal-500" />
                                                Patients Treated:
                                            </span>
                                            <span className="font-bold">{doctor.patients.toLocaleString()}+</span>
                                        </div>

                                        {/* Book Button */}
                                        <Button
                                            block
                                            type="primary"
                                            size="large"
                                            onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                                            className="rounded-xl shadow-lg hover:shadow-xl font-semibold py-3"
                                        >
                                            Book Appointment
                                        </Button>
                                    </div>
                                </Card>
                            </ScrollAnimated>
                        </Col>
                    ))}
                </Row>

                {/* No doctors message */}
                {filteredDoctors.length === 0 && (
                    <div className="text-center py-20">
                        <ScrollAnimated delay={0.6}>
                            <EditOutlined className="text-8xl text-teal-200 mx-auto mb-8 opacity-50" />
                            <h3 className="text-2xl font-bold text-slate-600 mb-4">No doctors found</h3>
                            <p className="text-slate-500">Try selecting a different specialty</p>
                        </ScrollAnimated>
                    </div>
                )}
            </ScrollAnimated>
        </div >
    );
};

export default Doctors;