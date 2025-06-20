// services/authService.js - Authentication services
import api from './api';

export const authService = {
  // Guest: Request OTP for registration (Step 1)
  requestRegistrationOTP: async (userData) => {
    const response = await api.post('/api/auth/register/request-otp', userData);
    return response.data;
  },

  // Guest: Verify OTP and complete registration (Step 2)
  verifyOTP: async (verificationData) => {
    const response = await api.post('/api/auth/register/verify', verificationData);
    if (response.data.accessToken) {
      localStorage.setItem('authToken', response.data.accessToken);
      // Store user data properly from AuthResponse
      const userData = {
        id: response.data.userId,
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role
      };
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return response.data;
  },

  // Member: Login and get token
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    if (response.data.accessToken) {
      localStorage.setItem('authToken', response.data.accessToken);
      // Store user data properly from AuthResponse
      const userData = {
        id: response.data.userId,
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role
      };
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return response.data;
  },

  // Guest: Request password reset
  forgotPassword: async (email) => {
    const response = await api.post('/api/auth/forgot-password', { email });
    return response.data;
  },

  // Guest: Reset password with token
  resetPassword: async (resetData) => {
    const { token, password } = resetData;
    const response = await api.post(`/api/auth/reset-password`, { token, password });
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  // Get stored auth token
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get user role
  getUserRole: () => {
    const user = authService.getCurrentUser();
    return user?.role || 'GUEST';
  }
};

export default authService;
