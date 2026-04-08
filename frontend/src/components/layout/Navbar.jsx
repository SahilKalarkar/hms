import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Drawer } from "antd";
import {
    HomeOutlined, InfoCircleOutlined, TeamOutlined, SmileOutlined,
    UserOutlined, ArrowDownOutlined, MenuOutlined, CloseOutlined, PhoneOutlined
} from "@ant-design/icons";
import { GLOBAL_PATH } from "../../config";

const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);  // ✅ Fix resize glitch
    const isAdminRoute = location.pathname.startsWith("/admin");

    // ✅ Fix resize glitch
    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const desktopMenuItems = [
        {
            key: "home",
            label: <Link to="/">Home</Link>,
        },
        {
            key: "about",
            label: <Link to="/about">About</Link>,
        },
        {
            key: "doctors",
            label: <Link to="/doctors">Doctors</Link>,
        },
        {
            key: "services",
            label: (
                <span className="flex items-center gap-1">
                    Services
                    <ArrowDownOutlined className="text-xs" />  {/* ✅ Desktop arrow */}
                </span>
            ),
            children: [
                { key: "departments", label: <Link to="/services/departments">Departments</Link> },
                { key: "services-list", label: <Link to="/services/list">Services</Link> },
                { key: "diagnostics", label: <Link to="/services/diagnostics">Diagnostics</Link> },
                { key: "patientCare", label: <Link to="/services/patientCare">Patient Care</Link> },
            ],
        },
    ];

    const adminMenu = [
        {
            key: "admin-dashboard",
            label: <Link to="/admin/dashboard">Admin Dashboard</Link>,
            icon: <TeamOutlined />,
        },
    ];


    const mobileMenuItems = [
        {
            key: "home",
            label: <Link to="/">Home</Link>,
        },
        {
            key: "about",
            label: <Link to="/about">About</Link>,
        },
        {
            key: "doctors",
            label: <Link to="/doctors">Doctors</Link>,
        },
        {
            key: "services",
            label: (
                <span className="flex items-center gap-1">
                    Services
                </span>
            ),
            children: [
                { key: "departments", label: <Link to="/services/departments">Departments</Link> },
                { key: "services-list", label: <Link to="/services/list">Services</Link> },
                { key: "diagnostics", label: <Link to="/services/diagnostics">Diagnostics</Link> },
                { key: "patientCare", label: <Link to="/services/patientCare">Patient Care</Link> },
            ],
        },
        {
            type: "divider",
        },
        {
            key: "call",
            label: (
                <a href="tel:+91XXXXXXXXXX" className="flex items-center p-4 hover:bg-teal-50">
                    <PhoneOutlined className="mr-3 text-teal-500" />
                    Call Now
                </a>
            ),
        },
        {
            key: "book",
            label: (
                <Button
                    block
                    type="primary"
                    className="m-4"
                    onClick={() => {
                        setMobileDrawerVisible(false);
                        navigate(`${GLOBAL_PATH}/contact`);
                    }}
                >
                    Book Now
                </Button>
            ),
        },
    ];

    const toggleDrawer = () => {
        setMobileDrawerVisible(!mobileDrawerVisible);
    };

    return (
        <>
            <Header
                className="px-4 sticky top-0 z-50 bg-linear-to-r from-teal-100 via-cyan-100 to-teal-200 text-slate-800 shadow-md backdrop-blur-xl"
                style={{ padding: '0 16px' }}
            >
                <div className="flex items-center justify-between px-0 md:px-20 h-16">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link to="/" className="flex items-center">
                            <span className="hidden md:block text-xl font-bold text-slate-800">
                                HospitalCare
                            </span>
                            <div className="md:hidden w-10 h-10 bg-linear-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-xl font-bold text-white">HC</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu - Fixed resize */}
                    <div className={`hidden lg:flex flex-1 justify-center items-center`}>
                        <Menu
                            mode="horizontal"
                            items={isAdminRoute ? adminMenu : desktopMenuItems}
                            style={{
                                borderBottom: "none",
                                background: "transparent",
                                minWidth: "100%",
                                flex: "1",
                                justifyContent: "center",
                                margin: "0 auto"
                            }}
                            className="w-full max-w-4xl"
                            selectedKeys={[]}
                        />
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <Button
                            size="middle"
                            href="tel:+91XXXXXXXXXX"
                            type="primary"
                            ghost
                            className="rounded-xl"
                        >
                            Call Now
                        </Button>
                        <Button
                            onClick={() => navigate(`${GLOBAL_PATH}/contact`)}
                            size="middle"
                            type="primary"
                            className="rounded-xl"
                        >
                            Book Now
                        </Button>
                        {/* <Button
                            onClick={() => navigate(`${GLOBAL_PATH}/admin/login`)}
                            size="middle"
                            type="primary"
                            ghost
                            className="rounded-xl"
                        >
                            Admin
                        </Button> */}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden flex items-center">
                        <Button
                            type="text"
                            icon={<MenuOutlined className="text-xl" />}
                            onClick={toggleDrawer}
                            className="p-2 rounded-xl hover:bg-teal-50"
                        />
                    </div>
                </div>
            </Header>

            {/* Mobile Drawer - NO arrows */}
            <Drawer
                title={
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-slate-800">HospitalCare</span>
                        <Button type="text" icon={<CloseOutlined />} onClick={toggleDrawer} />
                    </div>
                }
                placement="right"
                closable={false}
                onClose={toggleDrawer}
                open={mobileDrawerVisible}
                width={220}
                bodyStyle={{ padding: 0 }}
                className="custom-navbar-drawer"
            >
                <Menu
                    mode="inline"
                    items={mobileMenuItems}
                    style={{ borderRight: 0 }}
                    selectedKeys={[]}
                />
            </Drawer>
        </>
    );
};

export default Navbar;