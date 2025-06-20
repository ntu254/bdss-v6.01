// src/pages/staff/StaffDonorManagementPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../../components/layouts/PageHeader.jsx';
import UserManagementTable from '../../components/admin/UserManagementTable';
import userService from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import { useDebounce } from '../../hooks/useDebounce.js';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StaffDonorManagementPage = () => {
    const [donors, setDonors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchDonors = useCallback(async (page, search) => {
        setIsLoading(true);
        setError(null);
        try {
            // Lấy tất cả user nhưng lọc theo vai trò 'Member'
            const data = await userService.getAllUsers(page, 10, ['id', 'asc'], search, { role: 'Member' });
            setDonors(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (err) {
            const message = err.response?.data?.message || "Không thể tải danh sách người hiến máu.";
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDonors(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm, fetchDonors]);

    return (
        <div className="space-y-6">
            <PageHeader title="Quản lý Người hiến máu" subtitle="Quản lý thông tin và hồ sơ người hiến máu" />

            <div className="bg-white p-6 rounded-lg shadow-soft border">
                <div className="flex justify-between items-center mb-4">
                    <SearchBar onSearch={setSearchTerm} placeholder="Tìm kiếm người hiến máu..." />
                </div>

                {isLoading && <div className="flex justify-center py-10"><LoadingSpinner /></div>}
                {error && !isLoading && <div className="text-center py-10 text-red-500">{error}</div>}

                {!isLoading && !error && (
                    <>
                        <UserManagementTable
                            users={donors}
                            isStaffView={true} // Prop để tùy chỉnh table cho view của staff
                        />
                        {totalPages > 1 && (
                            <div className="mt-6 flex justify-center">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                    isLoading={isLoading}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default StaffDonorManagementPage;