import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Tạo Context
export const AuthContext = createContext(null);

// Tạo Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng
    const [loading, setLoading] = useState(true); // Trạng thái loading để kiểm tra auth ban đầu
    const [error, setError] = useState(null); // Trạng thái lỗi

    // Kiểm tra xem người dùng đã đăng nhập trước đó chưa
    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        const token = authService.getToken();
        
        if (storedUser && token) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    // Hàm đăng nhập với API thực
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await authService.login({ email, password });
            
            // Update user state từ response
            const userData = {
                id: response.userId,
                email: response.email,
                fullName: response.fullName,
                role: response.role
            };
            
            setUser(userData);
            return userData;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };    // Hàm đăng ký bước 1: Gửi OTP
    const register = async (userData) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await authService.requestRegistrationOTP(userData);
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };    // Hàm xác thực OTP bước 2: Hoàn tất đăng ký
    const verifyOTP = async (verificationData) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await authService.verifyOTP(verificationData);
            
            if (response.accessToken) {
                const userData = {
                    id: response.userId,
                    email: response.email,
                    fullName: response.fullName,
                    role: response.role
                };
                setUser(userData);
                return userData;
            }
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Xác thực thất bại';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Hàm đăng xuất
    const logout = () => {
        authService.logout();
        setUser(null);
        setError(null);
    };    // Clear error
    const clearError = () => {
        setError(null);
    };

    // Check if user has specific role
    const hasRole = (role) => {
        return user?.role === role;
    };

    // Check if user has any of the specified roles
    const hasAnyRole = (roles) => {
        return roles.includes(user?.role);
    };

    // Giá trị cung cấp bởi Context
    const value = {
        user,
        isAuthenticated: !!user && !!authService.getToken(),
        loading,
        error,
        login,
        register,
        verifyOTP,
        logout,
        clearError,
        hasRole,
        hasAnyRole,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
