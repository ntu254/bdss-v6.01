// src/pages/MemberDashboardPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, History, Calendar, AlertTriangle } from 'lucide-react';
import DashboardOverview from '../components/dashboard/DashboardOverview'; 
import DonationHistoryList from '../components/user/DonationHistoryList'; 
import DashboardAppointments from '../components/dashboard/DashboardAppointments'; 
import DashboardEmergencyRequests from '../components/dashboard/DashboardEmergencyRequests'; 

const MemberDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const tabs = {
        overview: { label: 'Tổng quan', icon: LayoutDashboard, component: <DashboardOverview /> },
        history: { label: 'Lịch sử hiến máu', icon: History, component: <DonationHistoryList /> },
        appointments: { label: 'Lịch hẹn', icon: Calendar, component: <DashboardAppointments /> },
        emergency: { label: 'Yêu cầu khẩn cấp', icon: AlertTriangle, component: <DashboardEmergencyRequests /> },
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển</h1>
                    <p className="text-gray-600 mt-1">Xem lịch sử hiến máu và các lịch hẹn sắp tới của bạn.</p>
                </div>

                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        {Object.entries(tabs).map(([key, { label, icon: Icon }]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors
                                    ${activeTab === key
                                        ? 'border-red-500 text-red-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Icon className="mr-2 h-5 w-5" />
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div>
                    {tabs[activeTab].component}
                </div>
            </div>
        </div>
    );
};

export default MemberDashboardPage;