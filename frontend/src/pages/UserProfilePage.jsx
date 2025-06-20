import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth'; // Giả sử bạn có một hook để lấy thông tin người dùng đã đăng nhập
import userService from '../services/userService';
import toast from 'react-hot-toast';
import { User, Shield, History } from 'lucide-react';

import LoadingSpinner from '../components/common/LoadingSpinner';
import UserProfileSidebar from '../components/user/UserProfileSidebar'; // Component mới
import ProfileTab from '../components/user/ProfileTab'; // Component mới
import AccountTab from '../components/user/AccountTab'; // Component mới
import DonationHistoryList from '../components/user/DonationHistoryList'; // Tái sử dụng

const UserProfilePage = () => {
    const { user: authUser, loading: authLoading } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');

    const fetchProfile = useCallback(async () => {
        if (!authUser) return;
        setIsLoading(true);
        try {
            const data = await userService.getCurrentUserProfile();
            setProfileData(data);
        } catch (error) {
            toast.error("Lỗi khi tải thông tin cá nhân: " + (error.response?.data?.message || error.message));
        } finally {
            setIsLoading(false);
        }
    }, [authUser]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleProfileUpdate = (updatedData) => {
        setProfileData(updatedData);
    };

    if (authLoading || isLoading) {
        return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner size="12" /></div>;
    }

    if (!profileData) {
        return <div className="text-center py-20">Không thể tải thông tin hồ sơ.</div>;
    }

    const TABS = {
        profile: { label: 'Hồ Sơ', icon: User, component: <ProfileTab userProfile={profileData} onProfileUpdate={handleProfileUpdate} /> },
        account: { label: 'Tài Khoản', icon: Shield, component: <AccountTab /> },
        history: { label: 'Lịch Sử Hiến Máu', icon: History, component: <DonationHistoryList /> },
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* --- Sidebar --- */}
                    <div className="lg:col-span-1">
                        <UserProfileSidebar user={profileData} />
                    </div>

                    {/* --- Main Content --- */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
                            {/* Tab Navigation */}
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                                    {Object.keys(TABS).map((tabKey) => {
                                        const TabIcon = TABS[tabKey].icon;
                                        return (
                                            <button
                                                key={tabKey}
                                                onClick={() => setActiveTab(tabKey)}
                                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === tabKey
                                                        ? 'border-red-500 text-red-600'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                    }`}
                                            >
                                                <TabIcon className="mr-2 h-5 w-5" />
                                                {TABS[tabKey].label}
                                            </button>
                                        )
                                    })}
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6 md:p-8">
                                {TABS[activeTab].component}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;