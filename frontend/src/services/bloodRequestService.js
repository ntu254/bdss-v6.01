// services/bloodRequestService.js - Blood request management services
import api from './api';

export const bloodRequestService = {
  // Staff/Admin: Create new blood request
  createBloodRequest: async (requestData) => {
    const response = await api.post('/api/blood-requests', requestData);
    return response.data;
  },

  // Member: Get active blood requests that need donors
  getActiveBloodRequests: async () => {
    const response = await api.get('/api/blood-requests/search/active');
    return response.data;
  },

  // Member/Staff/Admin: Get blood request details by ID
  getBloodRequestById: async (requestId) => {
    const response = await api.get(`/api/blood-requests/${requestId}`);
    return response.data;
  },

  // Member: Pledge to donate for a specific blood request
  pledgeForBloodRequest: async (requestId) => {
    const response = await api.post(`/api/blood-requests/${requestId}/pledge`);
    return response.data;
  }
};

export default bloodRequestService;
