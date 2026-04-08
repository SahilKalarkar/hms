import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminHeader from './AdminHeader';

const { Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="h-screen overflow-hidden bg-gray-50">
            {/* FIXED Navbar - No Scroll */}
            <AdminNavbar
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
            />

            <Layout className={`transition-all duration-300 h-screen`}>
                <AdminHeader
                    collapsed={collapsed}
                    onCollapse={() => setCollapsed(!collapsed)}
                />

                <Content className="overflow-y-auto bg-gray-50"
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;