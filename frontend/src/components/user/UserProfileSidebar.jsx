// src/components/user/UserProfileSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import Button from '../common/Button';
import { Calendar, Droplet, Mail, User } from 'lucide-react';

const UserProfileSidebar = ({ user }) => {
    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
    };

    return (
        <div className="bg-white rounded-lg shadow-soft p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-red-100">
                <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                <AvatarFallback className="text-3xl">{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>

            <div className="space-y-3 text-left text-sm text-gray-700">
                <div className="flex items-center">
                    <Droplet className="w-4 h-4 mr-2 text-red-500" />
                    <span>Nhóm máu: <strong>{user.bloodTypeDescription || 'Chưa cập nhật'}</strong></span>
                </div>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-red-500" />
                    <span>Lần hiến cuối: <strong>{user.lastDonationDate ? new Date(user.lastDonationDate).toLocaleDateString('vi-VN') : 'Chưa có'}</strong></span>
                </div>
                <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-red-500" />
                    <span>Tham gia từ: <strong>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</strong></span>
                </div>
            </div>

            <Link to="/request-donation" className="mt-6 block">
                <Button variant="primary" className="w-full">
                    Đặt lịch hiến máu
                </Button>
            </Link>
        </div>
    );
};

export default UserProfileSidebar;