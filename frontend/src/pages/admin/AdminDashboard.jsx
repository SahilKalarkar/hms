import React, { useState, useEffect } from 'react';
import {
    Row, Col, Card, Statistic, Space, Typography, Button, Badge, Progress,
    Skeleton, Empty, Divider
} from 'antd';
import {
    DashboardOutlined, UserOutlined, EditOutlined, CalendarOutlined,
    PhoneOutlined, DollarOutlined, BarChartOutlined, PieChartOutlined,
    NotificationOutlined, ReloadOutlined, ArrowUpOutlined, ArrowDownOutlined
} from '@ant-design/icons';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({});
    const [chartData, setChartData] = useState({ revenue: [], appointments: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, chartsRes] = await Promise.all([
                api.get('/admin/dashboard/stats'),
                api.get('/admin/dashboard/charts')
            ]);
            setStats(statsRes.data || {});
            setChartData(chartsRes.data || {});
        } catch (err) {
            console.error('Dashboard error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8 bg-linear-to-br from-slate-50 via-teal-50 to-blue-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row lg:items-center justify-between gap-6">
                <div>
                    <div className="text-2xl font-black bg-linear-to-r from-slate-900 via-teal-900 to-blue-900 bg-clip-text text-transparent drop-shadow-lg">
                        Dashboard
                    </div>
                    <div className="text-lg text-slate-600 font-semibold">Hospital Analytics Overview</div>
                </div>
                {/* <Button
                    icon={<ReloadOutlined />}
                    onClick={fetchDashboardData}
                    // size="large"
                    className="rounded-xl shadow-lg hover:shadow-xl"
                    loading={loading}
                >
                    Refresh Data
                </Button> */}
            </div>

            {/* KPI Stats */}
            <Row className='grid! grid-cols-1! md:grid-cols-2! lg:grid-cols-4! gap-4!'>
                <Card className="shadow-2xl! border-0! hover:scale-[1.02]! transition-all! duration-300! bg-white/70! backdrop-blur-xl!">
                    <Statistic
                        title={<span className="text-slate-600 font-semibold">Total Patients</span>}
                        value={stats.patients || 0}
                        valueStyle={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold' }}
                        prefix={<UserOutlined className="text-3xl" />}
                    />
                </Card>
                <Card className="shadow-2xl! border-0! hover:scale-[1.02]! transition-all! duration-300! bg-linear-to-r! from-blue-500/20! to-indigo-500/20! backdrop-blur-xl!">
                    <Statistic
                        title={<span className="text-slate-600 font-semibold">Active Doctors</span>}
                        value={stats.doctors || 0}
                        valueStyle={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 'bold' }}
                        prefix={<EditOutlined className="text-3xl" />}
                    />
                </Card>
                <Card className="shadow-2xl! border-0! hover:scale-[1.02]! transition-all! duration-300! bg-linear-to-r! from-emerald-500/20! to-teal-500/20! backdrop-blur-xl!">
                    <Statistic
                        title={<span className="text-slate-600 font-semibold">Appointments</span>}
                        value={stats.appointments || 0}
                        valueStyle={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold' }}
                        prefix={<CalendarOutlined className="text-3xl" />}
                    />
                </Card>
                <Card className="shadow-2xl! border-0! hover:scale-[1.02]! transition-all! duration-300! bg-linear-to-r! from-amber-500/20! to-orange-500/20! backdrop-blur-xl!">
                    <Statistic
                        title={<span className="text-slate-600 font-semibold">Revenue</span>}
                        value={`₹${(stats.revenue || 0).toLocaleString()}`}
                        valueStyle={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold' }}
                        prefix={<DollarOutlined className="text-2xl" />}
                    />
                </Card>
            </Row>

            <Row className='flex flex-col! md:flex-row! gap-2'>
                <Col className='flex-2'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                        <Card className="shadow-2xl border-0 bg-linear-to-r from-emerald-500/20 to-teal-500/20">
                            <Statistic
                                title="Occupancy Rate"
                                value={95}
                                precision={0}
                                valueStyle={{ color: '#10b981' }}
                                prefix={<>🏥</>}
                                suffix="%"
                            />
                            <Progress percent={95} strokeColor="#10b981" showInfo={false} className="mt-4" />
                        </Card>
                        <Card className="shadow-2xl border-0 bg-linear-to-r from-blue-500/20 to-indigo-500/20">
                            <Statistic
                                title="Avg Rating"
                                value={4.8}
                                precision={1}
                                valueStyle={{ color: '#3b82f6' }}
                                prefix={<>⭐</>}
                            />
                            <div className="flex gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-2xl text-yellow-400">★</span>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <Card className="mt-2! shadow-2xl border-0 bg-linear-to-r from-amber-500/20 to-orange-500/20">
                        <Statistic
                            title="Growth Rate"
                            value={24}
                            precision={0}
                            valueStyle={{ color: '#f59e0b' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                        <Progress percent={24} strokeColor="#f59e0b" className="mt-4" />
                    </Card>

                </Col>

                <Col className='flex-1'>
                    <Card
                        title={
                            <Space>
                                <PieChartOutlined className="text-2xl! text-purple-600!" />
                                <span className="font-bold text-xl">Departments</span>
                            </Space>
                        }
                        className="shadow-2xl! border-0! h-76! bg-linear-to-br! from-purple-50! to-pink-50! backdrop-blur-xl!"
                        bodyStyle={{
                            height: '250px',
                            overflow: 'hidden'
                        }}
                    >
                        {loading ? (
                            <Skeleton active />
                        ) : chartData.departments?.length ? (
                            <div
                                className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400 p-2"
                                style={{ maxHeight: '340px' }}
                            >
                                {chartData.departments.slice(0, 8).map((dept, idx) => (
                                    <div key={idx} className="flex items-center p-2 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02] border border-slate-100 mb-3 last:mb-0">
                                        <div
                                            className="w-5 h-5 rounded-full mr-2 shadow-lg shrink-0"
                                            style={{
                                                background: `linear-gradient(135deg, hsl(${idx * 45}, 70%, 55%) 0%, hsl(${idx * 45}, 70%, 45%) 100%)`
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-slate-800 text-lg capitalize truncate">{dept.department_name}</div>
                                            <div className="text-sm text-slate-500">{dept.appointments_count || 0} appointments</div>
                                        </div>
                                        <div className="text-xl font-black text-teal-600 bg-teal-100 px-4 py-2 rounded-xl shadow-lg min-w-20 text-center shrink-0">
                                            {dept.count}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Empty description="No department data" />
                        )}
                    </Card>
                </Col>
            </Row >

        </div >
    );
};

export default AdminDashboard;