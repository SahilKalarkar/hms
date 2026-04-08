import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    DashboardOutlined, EditOutlined, UserOutlined,
    CalendarOutlined, BarChartOutlined, SettingOutlined
} from '@ant-design/icons';
import { CiStethoscope } from "react-icons/ci";

const { Sider } = Layout;

const AdminNavbar = ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            path: '/admin/dashboard'
        },
        {
            key: 'doctors',
            icon: <CiStethoscope className='text-xl!' />,
            label: 'Doctors',
            path: '/admin/doctors'
        },
        {
            key: 'patients',
            icon: <UserOutlined />,
            label: 'Patients',
            path: '/admin/patients'
        },
        {
            key: 'appointments',
            icon: <CalendarOutlined />,
            label: 'Appointments',
            path: '/admin/appointments'
        },
        {
            key: 'departments',
            icon: <EditOutlined />,
            label: 'Departments',
            path: '/admin/departments'
        },
        // {
        //     key: 'settings',
        //     icon: <SettingOutlined />,
        //     label: 'Settings',
        //     path: '/admin/settings'
        // },
    ];

    const handleMenuClick = ({ key }) => {
        const item = menuItems.find(item => item.key === key);
        if (item) {
            navigate(item.path);
        }
    };

    const activeKey = menuItems.find(item => location.pathname === item.path)?.key || 'dashboard';

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={210}
            className="shadow-2xl h-screen z-50"
            style={{
                background: 'linear-gradient(180deg, #0f766e 0%, #14b8a6 50%, #0d9488 100%)', // ✅ Teal theme
                borderRight: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <div className="p-4 text-white h-full flex flex-col">
                {/* Logo */}
                <div className="flex items-center justify-center mb-2 pb-4 border-b border-white/20 shrink-0">
                    {collapsed ? (
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                            <span className="text-lg font-bold">HC</span>
                        </div>
                    ) : (
                        <h3 className="m-0! font-bold text-xl bg-linear-to-r from-teal-200 to-teal-100 bg-clip-text text-transparent">
                            HospitalCare
                        </h3>
                    )}
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-auto px-1">
                    <Menu
                        theme="dark"
                        mode="inline"
                        inlineCollapsed={collapsed}
                        selectedKeys={[activeKey]}  // ✅ Active state
                        onClick={handleMenuClick}    // ✅ Navigation
                        items={menuItems.map(item => ({
                            key: item.key,
                            icon: React.cloneElement(item.icon, {
                                style: { fontSize: '18px' }
                            }),
                            label: collapsed ? null : item.label,
                        }))}
                        className="border-none rounded-lg"
                        style={{
                            background: 'transparent',
                            color: 'white',
                            height: '100%',
                        }}
                        itemIcon={undefined}
                        selectable={true}
                    />
                </div>
            </div>
        </Sider>
    );
};

export default AdminNavbar;