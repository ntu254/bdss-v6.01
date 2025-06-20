// src/components/dashboard/DashboardOverview.jsx
import React from 'react';
import { Droplet, Heart, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import DashboardStatCard from './DashboardStatCard';

const DashboardOverview = () => {
    // Dữ liệu này sẽ được fetch từ API trong thực tế
    const overviewData = {
        totalDonations: 8,
        livesImpacted: 8 * 3,
        lastDonation: '2 tháng trước',
        bloodType: 'A+',
        eligibleDate: '15/09/2023',
        isEligible: true,
        upcomingAppointments: [
            { id: 1, date: '15/06/2023', time: '10:30 AM', type: 'Máu toàn phần', status: 'Sắp tới' }
        ],
        recentHistory: [
            { id: 1, date: '15/05/2023', type: 'Máu toàn phần', location: 'Central Medical Center', units: 1, status: 'Hoàn thành' },
            { id: 2, date: '10/01/2023', type: 'Huyết tương', location: 'Community Blood Drive', units: 1, status: 'Hoàn thành' }
        ]
    };

    return (
        <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatCard title="Tổng số lần hiến" value={overviewData.totalDonations} description="Cảm ơn những đóng góp của bạn!" icon={Heart} />
                <DashboardStatCard title="Số người được cứu" value={overviewData.livesImpacted} description="Mỗi lần hiến máu cứu được 3 người" icon={Heart} />
                <DashboardStatCard title="Lần hiến cuối" value={overviewData.lastDonation} description="Lần đóng góp gần đây nhất của bạn" icon={Clock} />
                <DashboardStatCard title="Nhóm máu" value={overviewData.bloodType} description="Thông tin nhóm máu của bạn" icon={Droplet} />
            </div>

            {/* Next Donation & Appointments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-soft border">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Ngày hiến máu tiếp theo</h3>
                    <p className="text-gray-600 mb-2">Dựa trên nhóm máu và lần hiến cuối của bạn.</p>
                    {overviewData.isEligible ? (
                        <div className="bg-green-100 text-green-800 p-4 rounded-md text-center">
                            <p className="font-semibold">Bạn đủ điều kiện để hiến máu ngay bây giờ!</p>
                            <p className="text-sm">Bạn đã đủ điều kiện từ ngày {overviewData.eligibleDate}</p>
                        </div>
                    ) : (
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md text-center">
                            <p className="font-semibold">Bạn sẽ sớm đủ điều kiện.</p>
                            <p className="text-sm">Ngày dự kiến: {overviewData.eligibleDate}</p>
                        </div>
                    )}
                    <Link to="/request-donation" className="mt-4 block">
                        <Button variant="primary" className="w-full">Đặt lịch hiến máu ngay</Button>
                    </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-soft border">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Lịch hẹn sắp tới</h3>
                    {overviewData.upcomingAppointments.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {overviewData.upcomingAppointments.map(app => (
                                <li key={app.id} className="py-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-800">{app.date} - {app.time}</p>
                                        <p className="text-sm text-gray-500">{app.type}</p>
                                    </div>
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{app.status}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm">Bạn không có lịch hẹn nào sắp tới.</p>
                    )}
                </div>
            </div>

            {/* Recent History */}
            <div className="bg-white p-6 rounded-lg shadow-soft border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Lịch sử hiến máu gần đây</h3>
                {/* Bạn có thể tái sử dụng component DonationHistoryList với prop giới hạn số lượng */}
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">Ngày</th>
                            <th className="py-2">Loại</th>
                            <th className="py-2">Địa điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {overviewData.recentHistory.map(item => (
                            <tr key={item.id} className="border-b">
                                <td className="py-3">{item.date}</td>
                                <td className="py-3">{item.type}</td>
                                <td className="py-3">{item.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardOverview;