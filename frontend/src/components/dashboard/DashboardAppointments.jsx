// src/components/dashboard/DashboardAppointments.jsx
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Clock } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import appointmentService from '../../services/appointmentService';

const DashboardAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            try {
                const response = await appointmentService.getMyAppointmentHistory();
                setAppointments(response.data || []);
            } catch (error) {
                toast.error("Không thể tải lịch hẹn hiến máu.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center p-10"><LoadingSpinner /></div>;
    }

    if (appointments.length === 0) {
        return <EmptyState 
            title="Không có lịch hẹn nào"
            description="Bạn chưa có lịch hẹn hiến máu nào."
            action={<Button href="/request-donation" variant="primary">Đặt lịch hiến máu</Button>}
        />;
    }

    const getStatusChip = (status) => {
        const statusClasses = {
            'PENDING': 'bg-yellow-100 text-yellow-800',
            'CONFIRMED': 'bg-blue-100 text-blue-800',
            'COMPLETED': 'bg-green-100 text-green-800',
            'CANCELLED': 'bg-red-100 text-red-800',
            'MISSED': 'bg-gray-100 text-gray-800',
        };
        
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Lịch hẹn hiến máu</h3>
            
            <div className="space-y-4">
                {appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 mr-2 text-red-500" />
                                    <span className="font-semibold">
                                        {new Date(appointment.appointmentDateTime).toLocaleDateString('vi-VN')} - 
                                        {new Date(appointment.appointmentDateTime).toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                                    <span>{appointment.location || 'Chưa xác định địa điểm'}</span>
                                </div>
                                {appointment.notes && (
                                    <p className="text-sm text-gray-600 mt-2 ml-6">{appointment.notes}</p>
                                )}
                            </div>
                            <div className="flex flex-col items-end">
                                {getStatusChip(appointment.status)}
                                {appointment.status === 'PENDING' && (
                                    <button 
                                        className="mt-2 text-xs text-red-600 hover:text-red-800"
                                        onClick={() => console.log('Cancel appointment', appointment.id)}
                                    >
                                        Hủy lịch hẹn
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-8">
                <Button variant="primary" href="/request-donation">Đặt lịch hẹn mới</Button>
            </div>
        </div>
    );
};

export default DashboardAppointments;