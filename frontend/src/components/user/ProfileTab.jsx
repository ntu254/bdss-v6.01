import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import userService from '../../services/userService';
import { bloodService } from '../../services/bloodService';

import Button from '../common/Button';
import InputField from '../common/InputField';
import LoadingSpinner from '../common/LoadingSpinner';

const ProfileTab = ({ userProfile, onProfileUpdate }) => {
    const { updateUser: updateUserContext } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        bloodTypeId: '',
        medicalConditions: '',
        currentMedications: ''
    });
    const [notificationPrefs, setNotificationPrefs] = useState({
        email: true,
        sms: false,
        emergency: true,
        reminders: true,
        marketing: false
    });
    const [bloodTypes, setBloodTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
    const [isSubmittingPrefs, setIsSubmittingPrefs] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);
            try {
                const types = await bloodService.getBloodTypes();
                setBloodTypes(types || []);

                if (userProfile) {
                    setFormData({
                        fullName: userProfile.fullName || '',
                        email: userProfile.email || '',
                        phone: userProfile.phone || '',
                        dateOfBirth: userProfile.dateOfBirth ? new Date(userProfile.dateOfBirth).toISOString().split('T')[0] : '',
                        address: userProfile.address || '',
                        bloodTypeId: userProfile.bloodTypeId || '',
                        medicalConditions: userProfile.medicalInformation?.conditions || '',
                        currentMedications: userProfile.medicalInformation?.medications || ''
                    });
                }
            } catch (error) {
                toast.error("Không thể tải dữ liệu cần thiết.");
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [userProfile]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePrefsChange = (e) => {
        const { name, checked } = e.target;
        setNotificationPrefs(prev => ({ ...prev, [name]: checked }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingProfile(true);
        const toastId = toast.loading('Đang cập nhật hồ sơ...');
        try {
            const { email, ...updatePayload } = formData;
            const res = await userService.updateUserProfile(updatePayload);
            onProfileUpdate(res);
            updateUserContext(res);
            toast.success('Cập nhật hồ sơ thành công!', { id: toastId });
        } catch (error) {
            const message = error.response?.data?.message || 'Cập nhật thất bại.';
            toast.error(message, { id: toastId });
        } finally {
            setIsSubmittingProfile(false);
        }
    };

    const handlePreferencesSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingPrefs(true);
        const toastId = toast.loading('Đang lưu cài đặt...');
        try {
            // await userService.updateNotificationPreferences(notificationPrefs); // Thay bằng API thật
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Lưu cài đặt thông báo thành công!', { id: toastId });
        } catch (error) {
            toast.error('Lưu cài đặt thất bại.', { id: toastId });
        } finally {
            setIsSubmittingPrefs(false);
        }
    };


    if (isLoading) {
        return <div className="flex justify-center p-10"><LoadingSpinner size="10" /></div>;
    }

    // Checkbox component cho form cài đặt
    const Checkbox = ({ id, label, description, checked, onChange, disabled }) => (
        <div className="relative flex items-start">
            <div className="flex items-center h-5">
                <input id={id} name={id} type="checkbox" className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" checked={checked} onChange={onChange} disabled={disabled} />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor={id} className="font-medium text-gray-700">{label}</label>
                <p className="text-gray-500">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Form 1: Profile and Medical Information */}
            <form onSubmit={handleProfileSubmit}>
                <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Thông tin Hồ sơ</h3>
                    <p className="text-sm text-gray-500 mb-6">Cập nhật thông tin cá nhân của bạn.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <InputField label="Họ và Tên" name="fullName" value={formData.fullName} onChange={handleFormChange} disabled={isSubmittingProfile} required />
                        <InputField label="Email" name="email" value={formData.email} disabled={true} />

                        <div>
                            <label htmlFor="bloodTypeId" className="block text-sm font-medium text-gray-700 mb-1">Nhóm máu</label>
                            <select id="bloodTypeId" name="bloodTypeId" value={formData.bloodTypeId} onChange={handleFormChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md shadow-sm" disabled={isSubmittingProfile}>
                                <option value="">Chọn nhóm máu</option>
                                {bloodTypes.map(bt => <option key={bt.id} value={bt.id}>{bt.name}</option>)}
                            </select>
                        </div>

                        <InputField label="Số điện thoại" name="phone" value={formData.phone} onChange={handleFormChange} disabled={isSubmittingProfile} />
                        <div className="md:col-span-2">
                            <InputField label="Địa chỉ" name="address" value={formData.address} onChange={handleFormChange} disabled={isSubmittingProfile} />
                        </div>
                        <InputField label="Ngày sinh" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleFormChange} disabled={isSubmittingProfile} />
                    </div>

                    <h4 className="text-lg font-semibold text-gray-700 mt-8 mb-4">Thông tin Y tế</h4>
                    <div className="space-y-4">
                        <InputField as="textarea" label="Tình trạng bệnh lý" name="medicalConditions" value={formData.medicalConditions} onChange={handleFormChange} placeholder="Liệt kê các tình trạng bệnh lý..." rows={4} disabled={isSubmittingProfile} />
                        <InputField as="textarea" label="Thuốc đang sử dụng" name="currentMedications" value={formData.currentMedications} onChange={handleFormChange} placeholder="Liệt kê các loại thuốc bạn đang dùng..." rows={4} disabled={isSubmittingProfile} />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button type="submit" isLoading={isSubmittingProfile}>
                        Cập nhật Hồ sơ
                    </Button>
                </div>
            </form>

            {/* Form 2: Notification Preferences */}
            <form onSubmit={handlePreferencesSubmit}>
                <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Cài đặt Thông báo</h3>
                    <p className="text-sm text-gray-500 mb-6">Quản lý cách bạn nhận thông báo và cảnh báo.</p>
                    <div className="space-y-4">
                        <Checkbox id="email" label="Thông báo Email" description="Nhận thông báo qua email." checked={notificationPrefs.email} onChange={handlePrefsChange} disabled={isSubmittingPrefs} />
                        <Checkbox id="sms" label="Thông báo SMS" description="Nhận thông báo qua tin nhắn văn bản." checked={notificationPrefs.sms} onChange={handlePrefsChange} disabled={isSubmittingPrefs} />
                        <Checkbox id="emergency" label="Cảnh báo khẩn cấp" description="Nhận cảnh báo khẩn cấp về yêu cầu hiến máu phù hợp." checked={notificationPrefs.emergency} onChange={handlePrefsChange} disabled={isSubmittingPrefs} />
                        <Checkbox id="reminders" label="Nhắc nhở hiến máu" description="Nhận nhắc nhở khi bạn đủ điều kiện hiến máu." checked={notificationPrefs.reminders} onChange={handlePrefsChange} disabled={isSubmittingPrefs} />
                        <Checkbox id="marketing" label="Email Tiếp thị" description="Nhận bản tin và các khuyến mãi." checked={notificationPrefs.marketing} onChange={handlePrefsChange} disabled={isSubmittingPrefs} />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button type="submit" isLoading={isSubmittingPrefs}>
                        Lưu Cài đặt
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileTab;