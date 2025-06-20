// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotfoundPage.jsx";
import UserProfilePage from "../pages/UserProfilePage";
import ForbiddenPage from "../pages/ForbiddenPage";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminLayout from "../components/layouts/AdminLayout.jsx";
import MainLayout from "../components/layouts/MainLayout.jsx";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUserListPage from "../pages/admin/AdminUserListPage";
import AdminUserCreatePage from "../pages/admin/AdminUserCreatePage";
import AdminUserEditPage from "../pages/admin/AdminUserEditPage";
import AdminUserDetailPage from "../pages/admin/AdminUserDetailPage";
import AdminBloodTypePage from "../pages/admin/AdminBloodTypePage";
import AdminBloodCompatibilityPage from "../pages/admin/AdminBloodCompatibilityPage";
import AdminDonationHistoryPage from "../pages/admin/AdminDonationHistoryPage";
import AdminEmergencyRequestsPage from "../pages/admin/AdminEmergencyRequestsPage";
import AdminBloodInventoryPage from "../pages/admin/AdminBloodInventoryPage";

import StaffDashboardPage from "../pages/staff/StaffDashboardPage"; 
import StaffDonorManagementPage from "../pages/staff/StaffDonorManagementPage"; 
import StaffInventoryPage from "../pages/staff/StaffInventoryPage"; 
import StaffDonationRequestsPage from "../pages/staff/StaffDonationRequestsPage"; 


import MemberDashboardPage from "../pages/MemberDashboardPage";
import BlogPage from '../pages/BlogPage';
import BlogDetailPage from '../pages/BlogDetailPage';
import BloodCompatibilityCheckerPage from "../pages/BloodCompatibilityCheckerPage";
import RequestDonationPage from '../pages/RequestDonationPage';
import BloodRequestsPage from '../pages/BloodRequestsPage';


const AppRoutes = () => (
    <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="/blood-compatibility" element={<BloodCompatibilityCheckerPage />} />
            <Route path="/blood-requests" element={<BloodRequestsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Route>

        {/* Authenticated User Routes */}
        <Route element={<MainLayout />}>
            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/request-donation" element={<RequestDonationPage />} />
                <Route path="/dashboard" element={<MemberDashboardPage />} />
            </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute requiredRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUserListPage />} />
                <Route path="users/new" element={<AdminUserCreatePage />} />
                <Route path="users/edit/:userId" element={<AdminUserEditPage />} />
                <Route path="users/view/:userId" element={<AdminUserDetailPage />} />
                <Route path="blood-types" element={<AdminBloodTypePage />} />
                <Route path="blood-compatibility" element={<AdminBloodCompatibilityPage />} />
                <Route path="donation-history" element={<AdminDonationHistoryPage />} />
                <Route path="emergency-requests" element={<AdminEmergencyRequestsPage />} />
                <Route path="blood-inventory" element={<AdminBloodInventoryPage />} />
            </Route>
        </Route>

        {/* Staff Routes */}
        <Route element={<ProtectedRoute requiredRoles={['Staff', 'Admin']} />}>
            <Route path="/staff" element={<AdminLayout />}>
                <Route index element={<StaffDashboardPage />} />
                <Route path="donors" element={<StaffDonorManagementPage />} />
                <Route path="inventory" element={<StaffInventoryPage />} />
                <Route path="requests" element={<StaffDonationRequestsPage />} />
            </Route>
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default AppRoutes;