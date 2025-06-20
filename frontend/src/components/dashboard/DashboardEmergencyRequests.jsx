// src/components/dashboard/DashboardEmergencyRequests.jsx
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import bloodRequestService from '../../services/bloodRequestService';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import { HeartOff } from 'lucide-react';

const EmergencyRequestCard = ({ request }) => {
    const priorityClasses = {
        'Critical': 'bg-red-100 text-red-700 border-red-500',
        'High': 'bg-yellow-100 text-yellow-800 border-yellow-600',
    };

    return (
        <div className="bg-white p-5 rounded-lg border-2 flex flex-col justify-between"
            style={{ borderColor: request.priority === 'Critical' ? '#ef4444' : '#f59e0b' }}>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-gray-800">{request.bloodType}</h4>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${priorityClasses[request.priority]}`}>
                        {request.priority}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                    <span>Bệnh viện:</span> <span className="font-medium text-right">{request.hospital}</span>
                    <span>Địa điểm:</span> <span className="font-medium text-right">{request.location}</span>
                    <span>Số lượng cần:</span> <span className="font-medium text-right">{request.units} đơn vị</span>
                    <span>Đăng lúc:</span> <span className="font-medium text-right">{request.posted}</span>
                    <span>Khoảng cách:</span> <span className="font-medium text-right">{request.distance}</span>
                </div>
            </div>
            <Button variant="primary" className="w-full mt-5">Phản hồi Yêu cầu</Button>
        </div>
    );
};

const DashboardEmergencyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true);
            try {
                // Giả sử service này tìm các yêu cầu phù hợp với user
                const data = await bloodRequestService.searchActiveRequests({ forUser: true });
                setRequests(data || []);
            } catch (error) {
                toast.error("Không thể tải các yêu cầu khẩn cấp.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRequests();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center p-10"><LoadingSpinner /></div>;
    }

    if (requests.length === 0) {
        return <EmptyState
            Icon={HeartOff}
            title="Không có yêu cầu khẩn cấp"
            message="Hiện tại không có yêu cầu nào phù hợp với nhóm máu của bạn."
        />;
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Yêu cầu máu khẩn cấp</h3>
            <p className="text-sm text-gray-500 -mt-4">Các yêu cầu khẩn cấp phù hợp với nhóm máu của bạn.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {requests.map(req => <EmergencyRequestCard key={req.id} request={req} />)}
            </div>
            <div className="text-center mt-6">
                <Button variant="outline">Xem tất cả yêu cầu</Button>
            </div>
        </div>
    );
};

export default DashboardEmergencyRequests;