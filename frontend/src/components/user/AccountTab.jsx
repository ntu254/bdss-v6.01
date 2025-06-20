// src/components/user/AccountTab.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import InputField from '../common/InputField';
// Giả sử có một service để đổi mật khẩu
import authService from '../../services/authService';

const AccountTab = () => {
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            toast.error("Mật khẩu mới không khớp!");
            return;
        }
        if (passwords.new.length < 6) {
            toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading('Đang đổi mật khẩu...');
        try {
            await authService.changePassword({
                currentPassword: passwords.current,
                newPassword: passwords.new
            });
            toast.success('Đổi mật khẩu thành công!', { id: toastId });
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (error) {
            const message = error.response?.data?.message || 'Đổi mật khẩu thất bại.';
            toast.error(message, { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            <h3 className="text-xl font-bold text-gray-800">Bảo mật Tài khoản</h3>
            <p className="text-gray-600">Cập nhật mật khẩu và các cài đặt bảo mật của bạn.</p>
            <InputField
                label="Mật khẩu hiện tại"
                type="password"
                name="current"
                value={passwords.current}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            <InputField
                label="Mật khẩu mới"
                type="password"
                name="new"
                value={passwords.new}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            <InputField
                label="Xác nhận mật khẩu mới"
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            <div className="pt-2">
                <Button type="submit" isLoading={isSubmitting}>
                    Đổi mật khẩu
                </Button>
            </div>
        </form>
    );
};

export default AccountTab;