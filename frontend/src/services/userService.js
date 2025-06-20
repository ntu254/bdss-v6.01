// services/userService.js - User management services
import api from './api';

export const userService = {
  // Member: Get current user profile
  getMyProfile: async () => {
    const response = await api.get('/api/users/me/profile');
    return response.data;
  },

  // Member: Update current user profile
  updateMyProfile: async (profileData) => {
    const response = await api.put('/api/users/me/profile', profileData);
    return response.data;
  },
  // Admin: Get all users (with pagination)
  getAllUsers: async (page = 0, size = 10, sort = 'id,asc') => {
    const response = await api.get('/api/admin/users', {
      params: { page, size, sort }
    });
    return response.data; // Returns Page<UserResponse>
  },

  // Admin: Get all users without pagination (for dropdowns, etc.)
  getAllUsersSimple: async () => {
    const response = await api.get('/api/admin/users', {
      params: { page: 0, size: 1000 }
    });
    return response.data.content; // Extract content array from Page
  },

  // Admin: Create new user
  createUser: async (userData) => {
    const response = await api.post('/api/admin/users', userData);
    return response.data;
  },

  // Admin: Update user
  updateUser: async (userId, userData) => {
    const response = await api.put(`/api/admin/users/${userId}`, userData);
    return response.data;
  },

  // Admin: Delete user (soft delete)
  deleteUser: async (userId) => {
    const response = await api.delete(`/api/admin/users/${userId}`);
    return response.data;
  },
  // Admin: Get user by ID
  getUserById: async (userId) => {
    const response = await api.get(`/api/admin/users/${userId}`);
    return response.data;
  },
  // Admin: Update user role
  updateUserRole: async (userId, role) => {
    const response = await api.put(`/api/admin/users/${userId}/role`, { role });
    return response.data;
  },
  
  // Admin: Update user status (activate, suspend, etc.)
  updateUserStatus: async (userId, status) => {
    const response = await api.put(`/api/admin/users/${userId}/status`, { status });
    return response.data;
  },
  
  // Admin: Get users by role
  getUsersByRole: async (role) => {
    const response = await api.get(`/api/admin/users/role/${role}`);
    return response.data;
  },

  // Admin: Activate user
  activateUser: async (userId) => {
    const response = await api.put(`/api/admin/users/${userId}/activate`);
    return response.data;
  },

  // Admin: Deactivate user
  deactivateUser: async (userId) => {    const response = await api.put(`/api/admin/users/${userId}/deactivate`);
    return response.data;
  }
};

export default userService;
