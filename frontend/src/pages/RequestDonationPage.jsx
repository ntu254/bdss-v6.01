// src/pages/RequestDonationPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { Container } from '../components';
import DonationGuideSidebar from '../components/user/DonationGuideSidebar';
import { CalendarPlus } from 'lucide-react';


const RequestDonationPage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        location: '',
        preferredDate: '',
        preferredTime: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        toast.promise(
            // Giả lập API call
            new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
                console.log("Donation request submitted:", formData);
                setFormData({ location: '', preferredDate: '', preferredTime: '', notes: '' });
            }),
            {
                loading: 'Đang gửi yêu cầu đặt lịch...',
                success: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn sớm.',
                error: 'Gửi yêu cầu thất bại. Vui lòng thử lại.',
            }
        ).finally(() => setIsSubmitting(false));
    };

    return (
        <Container>
            {/* --- CẬP NHẬT LAYOUT --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* --- CỘT CHÍNH (FORM) --- */}
                <div className="lg:col-span-2">
                    <div className="flex items-center mb-6">
                        <CalendarPlus className="w-8 h-8 text-red-600 mr-3" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Đặt lịch hiến máu</h1>
                            <p className="text-gray-600 mt-1">Chọn địa điểm và thời gian phù hợp với bạn.</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-soft border">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Địa điểm hiến máu</label>
                                <select
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md shadow-sm"
                                    required
                                >
                                    <option value="">-- Chọn một địa điểm --</option>
                                    <option value="central-hospital">Bệnh viện Trung ương</option>
                                    <option value="community-drive">Điểm hiến máu cộng đồng</option>
                                    <option value="mobile-clinic">Điểm hiến máu lưu động</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InputField
                                    label="Ngày mong muốn"
                                    name="preferredDate"
                                    type="date"
                                    value={formData.preferredDate}
                                    onChange={handleChange}
                                    required
                                />
                                <InputField
                                    label="Thời gian mong muốn"
                                    name="preferredTime"
                                    type="time"
                                    value={formData.preferredTime}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
                                    Xác nhận đặt lịch
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* --- CỘT PHỤ (SIDEBAR) --- */}
                <div className="lg:col-span-1">
                    <DonationGuideSidebar />
                </div>
            </div>
        </Container>
    );
};

export default RequestDonationPage;