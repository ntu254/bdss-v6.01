// src/pages/staff/StaffDashboardPage.jsx
import React from 'react';
import { Clock, Users, AlertTriangle, Droplet, Package } from 'lucide-react';
import PageHeader from '../../components/layouts/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

// Component thẻ thống kê
const StatCard = ({ title, value, description, icon: Icon }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
            <Icon className="h-5 w-5 text-gray-400" />
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <p className="text-xs text-gray-500">{description}</p>
        </CardContent>
    </Card>
);

const StaffDashboardPage = () => {
    // Dữ liệu này sẽ được fetch từ API trong thực tế
    const recentDonations = [
        { id: 1, name: 'Donor #1', type: 'A+', time: '1 hour ago' },
        { id: 2, name: 'Donor #2', type: 'O-', time: '2 hours ago' },
        { id: 3, name: 'Donor #3', type: 'B+', time: '3 hours ago' },
    ];

    const emergencyRequests = [
        { id: 1, type: 'O-', hospital: 'Central Medical Center', units: 3, urgency: 'Critical', status: 'Active' },
        { id: 2, type: 'B+', hospital: 'Memorial Hospital', units: 2, urgency: 'High', status: 'Matched' },
    ];

    const inventoryStatus = [
        { id: 'A+', units: 45, capacity: 100, status: 'Adequate' },
        { id: 'A-', units: 12, capacity: 50, status: 'Low' },
        // ... more inventory data
    ];

    return (
        <div className="space-y-6">
            <PageHeader title="Staff Dashboard" subtitle="Manage donations and donor information" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Today's Appointments" value="12" description="3 completed, 9 remaining" icon={Clock} />
                <StatCard title="Pending Requests" value="8" description="Awaiting processing" icon={Users} />
                <StatCard title="Low Inventory" value="2" description="Blood types below threshold" icon={AlertTriangle} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>Recent Donations</CardTitle></CardHeader>
                    <CardContent>
                        {/* List Recent Donations */}
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader><CardTitle>Emergency Requests</CardTitle></CardHeader>
                    <CardContent>
                        {/* Table of Emergency Requests */}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Package className="mr-2" /> Blood Inventory Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Table of Blood Inventory Status */}
                </CardContent>
            </Card>
        </div>
    );
};

export default StaffDashboardPage;