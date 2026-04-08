import React from 'react';
import { Layout, Button, Avatar, Space, Typography, Badge } from 'antd';
import {
    MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined,
    UserOutlined, BellOutlined, NotificationOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const AdminHeader = ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <Header className="bg-white/90! backdrop-blur-xl! shadow-sm! border-b! border-teal-200! px-4! sticky! top-0! z-20!">
            <div className="flex! items-center! justify-between! h-16!">
                {/* Toggle Button - Always visible */}
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={onCollapse}
                    className="text-teal-600! hover:text-teal-700! p-2! rounded-lg! hover:bg-teal-50! transition-all! shadow-sm!"
                />

                {/* Page Title - Responsive */}
                <div className="text-xl text-slate-800 font-bold flex-1 text-center lg:text-left mx-4 truncate"
                >
                    Admin Dashboard
                </div>

                {/* Right Section - Responsive */}
                <div className="flex items-center gap-2 lg:gap-3">
                    {/* Notifications - Hidden on mobile */}
                    <Badge count={3} size="small" offset={[-5, 5]} className="hidden md:block">
                        <Button
                            type="text"
                            icon={<NotificationOutlined className="text-lg" />}
                            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 hover:shadow-sm transition-all"
                        />
                    </Badge>

                    {/* Profile Avatar */}
                    <Avatar
                        size={40}
                        className="shadow-md border-2 border-white hover:shadow-lg hover:scale-105 transition-all cursor-pointer ring-1 ring-teal-100/50"
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}
                    >
                        AD
                    </Avatar>

                    {/* Profile Text - Hidden on mobile */}
                    <div className="hidden lg:block text-right mr-2">
                        <div className="font-semibold text-slate-800 text-sm leading-tight">Admin User</div>
                        <div className="text-xs text-slate-500 font-medium leading-tight">Super Admin</div>
                    </div>

                    {/* Logout Button */}
                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        onClick={logout}
                        size="large"
                        danger
                        className="text-red-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 shadow-sm hover:shadow-md transition-all ml-1"
                    />
                </div>
            </div>
        </Header>
    );
};

export default AdminHeader;