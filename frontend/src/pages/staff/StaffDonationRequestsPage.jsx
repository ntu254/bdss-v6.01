// src/pages/staff/StaffDonationRequestsPage.jsx
import React from 'react';
import PageHeader from '../../components/layouts/PageHeader';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/common/Button';

const StaffDonationRequestsPage = () => {
    // Dữ liệu này sẽ được fetch từ API
    const requests = [
        { id: 1, patient: 'John Smith', bloodType: 'A+', units: 2, urgency: 'Medium', status: 'Pending', date: 'May 15, 2023' },
        { id: 2, patient: 'Maria Garcia', bloodType: 'O-', units: 3, urgency: 'High', status: 'Matched', date: 'May 14, 2023' },
        { id: 3, patient: 'Robert Johnson', bloodType: 'B+', units: 1, urgency: 'Medium', status: 'Fulfilled', date: 'May 13, 2023' },
        { id: 4, patient: 'Sarah Williams', bloodType: 'AB+', units: 2, urgency: 'Low', status: 'Cancelled', date: 'May 12, 2023' },
    ];

    const urgencyVariant = { High: 'destructive', Medium: 'warning', Low: 'default' };
    const statusVariant = { Pending: 'warning', Matched: 'info', Fulfilled: 'success', Cancelled: 'destructive' };

    return (
        <div className="space-y-6">
            <PageHeader title="Yêu cầu Hiến máu" subtitle="Quản lý các yêu cầu hiến máu gửi đến" />
            <div className="bg-white p-6 rounded-lg shadow-soft border">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr className="border-b">
                                <th className="px-4 py-3 font-medium">Bệnh nhân</th>
                                <th className="px-4 py-3 font-medium">Loại máu</th>
                                <th className="px-4 py-3 font-medium">Số lượng cần</th>
                                <th className="px-4 py-3 font-medium">Độ khẩn</th>
                                <th className="px-4 py-3 font-medium">Trạng thái</th>
                                <th className="px-4 py-3 font-medium">Ngày yêu cầu</th>
                                <th className="px-4 py-3 font-medium text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requests.map(req => (
                                <tr key={req.id}>
                                    <td className="px-4 py-3 font-semibold">{req.patient}</td>
                                    <td className="px-4 py-3">{req.bloodType}</td>
                                    <td className="px-4 py-3">{req.units}</td>
                                    <td className="px-4 py-3"><Badge variant={urgencyVariant[req.urgency]}>{req.urgency}</Badge></td>
                                    <td className="px-4 py-3"><Badge variant={statusVariant[req.status]}>{req.status}</Badge></td>
                                    <td className="px-4 py-3">{req.date}</td>
                                    <td className="px-4 py-3 text-center">
                                        <Button variant="outline" size="sm">Cập nhật</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffDonationRequestsPage;