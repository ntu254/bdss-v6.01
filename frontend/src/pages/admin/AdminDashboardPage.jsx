// src/pages/admin/AdminDashboardPage.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Users, Droplet, Clock, AlertTriangle, PackageCheck, Server, Database, Activity, TrendingUp, Heart } from 'lucide-react';

import DashboardStatCard from '../../components/admin/DashboardStatCard';
import CriticalAlertsWidget from '../../components/admin/CriticalAlertsWidget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const AdminDashboardPage = () => {
    const { user } = useAuth();

    const stats = {
        registeredDonors: { value: '3.245', desc: '+12% tuần này', trend: '+12' },
        totalDonations: { value: '12.567', desc: '+45 tháng này', trend: '+8' },
        pendingRequests: { value: '28', desc: 'Đang chờ xử lý', trend: '-5' },
        emergencyRequests: { value: '5', desc: 'Cần xử lý ngay', trend: '+2', urgent: true },
        lowInventory: { value: '3', desc: 'loại máu dưới ngưỡng', trend: '0', warning: true }
    };

    const systemStatus = [
        { name: 'Trạng thái Máy chủ', status: 'Đang hoạt động', type: 'success' },
        { name: 'Trạng thái Cơ sở dữ liệu', status: 'Đang hoạt động', type: 'success' },
        { name: 'Trạng thái API', status: 'Đang hoạt động', type: 'success' },
        { name: 'Sao lưu cuối cùng', status: 'Hôm nay, 03:00', type: 'info' }
    ];

    const recentActivity = [
        { user: 'Quản trị viên', action: 'Tài khoản người dùng đã được tạo', time: '2 giờ trước', type: 'user' },
        { user: 'Nhân viên', action: 'Kho máu đã được cập nhật', time: '4 giờ trước', type: 'inventory' },
        { user: 'Hệ thống', action: 'Yêu cầu khẩn cấp đã được xử lý', time: '6 giờ trước', type: 'emergency' },
        { user: 'Hệ thống', action: 'Sao lưu hệ thống hoàn tất', time: '8 giờ trước', type: 'system' }
    ];

    return (
        <div className="space-y-8 animate-fadeInScale">
            {/* Premium Header with gradient */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-8 text-white shadow-colored-primary">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-8 h-8 text-red-200" />
                        <h1 className="text-3xl font-bold">Chào mừng trở lại, {user?.fullName || user?.email}!</h1>
                    </div>
                    <p className="text-red-100 text-lg">Đây là tổng quan về tình hình hoạt động của hệ thống hiến máu.</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/5 rounded-full"></div>
                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white/5 rounded-full"></div>
            </div>

            {/* Enhanced Stat Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1" hover elevated>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Người hiến máu đã đăng ký</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.registeredDonors.value}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-green-600 font-medium">{stats.registeredDonors.trend}%</span>
                                    <span className="text-sm text-gray-500">{stats.registeredDonors.desc}</span>
                                </div>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1" hover elevated>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Tổng số lần hiến máu</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalDonations.value}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-green-600 font-medium">{stats.totalDonations.trend}%</span>
                                    <span className="text-sm text-gray-500">{stats.totalDonations.desc}</span>
                                </div>
                            </div>
                            <div className="p-3 bg-red-100 rounded-xl">
                                <Droplet className="w-8 h-8 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1" hover elevated>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Yêu cầu đang chờ</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.pendingRequests.value}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-sm text-gray-600 font-medium">{stats.pendingRequests.desc}</span>
                                </div>
                            </div>
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <Clock className="w-8 h-8 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-red-200 bg-red-50" hover elevated>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-red-700 mb-1">Yêu cầu khẩn cấp</p>
                                <p className="text-3xl font-bold text-red-800">{stats.emergencyRequests.value}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-sm text-red-600 font-medium animate-pulse">{stats.emergencyRequests.desc}</span>
                                </div>
                            </div>
                            <div className="p-3 bg-red-200 rounded-xl">
                                <AlertTriangle className="w-8 h-8 text-red-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-orange-200 bg-orange-50" hover elevated>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-700 mb-1">Loại máu tồn kho thấp</p>
                                <p className="text-3xl font-bold text-orange-800">{stats.lowInventory.value}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-sm text-orange-600 font-medium">{stats.lowInventory.desc}</span>
                                </div>
                            </div>
                            <div className="p-3 bg-orange-200 rounded-xl">
                                <PackageCheck className="w-8 h-8 text-orange-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Enhanced System Status & Recent Activity */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                <Card className="lg:col-span-2 shadow-medium" variant="elevated">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3" size="lg">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Server className="h-6 w-6 text-green-600" />
                            </div>
                            Trạng thái Hệ thống
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {systemStatus.map((item, index) => (
                                <div key={item.name} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${
                                            item.type === 'success' ? 'bg-green-400 animate-pulse' : 
                                            item.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                                        }`}></div>
                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                    </div>
                                    <span className={`font-semibold text-sm px-3 py-1 rounded-full ${
                                        item.type === 'success' ? 'bg-green-100 text-green-700' :
                                        item.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 shadow-medium" variant="elevated">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3" size="lg">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Activity className="h-6 w-6 text-blue-600" />
                            </div>
                            Hoạt động Gần đây
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${
                                        activity.type === 'emergency' ? 'bg-red-400' :
                                        activity.type === 'inventory' ? 'bg-blue-400' :
                                        activity.type === 'user' ? 'bg-green-400' : 'bg-gray-400'
                                    }`}></div>
                                    <div className="flex-1">
                                        <p className="text-gray-800 font-medium">{activity.action}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500">bởi {activity.user}</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">{activity.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Enhanced Critical Alerts */}
            <div className="animate-slideInUp">
                <CriticalAlertsWidget />
            </div>
        </div>
    );
};

export default AdminDashboardPage;