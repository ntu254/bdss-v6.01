// services/donationService.js - Donation management services
import api from './api';

export const donationService = {
  // Member: Request donation (start donation process)
  requestDonation: async () => {
    const response = await api.post('/api/donations/request');
    return response.data;
  },

  // Member: Get my donation history
  getMyDonationHistory: async () => {
    const response = await api.get('/api/donations/my-history');
    return response.data;
  },

  // Staff: Update donation request status
  updateDonationStatus: async (requestId, statusData) => {
    const response = await api.put(`/api/donations/requests/${requestId}/status`, statusData);
    return response.data;
  },

  // Staff: Record health check
  recordHealthCheck: async (donationId, healthCheckData) => {
    const response = await api.post(`/api/donations/${donationId}/health-check`, healthCheckData);
    return response.data;
  },

  // Staff: Record blood collection
  recordBloodCollection: async (donationId, collectionData) => {
    const response = await api.post(`/api/donations/${donationId}/collect`, collectionData);
    return response.data;
  },

  // Staff: Record test result
  recordTestResult: async (donationId, testResultData) => {
    const response = await api.post(`/api/donations/${donationId}/test-result`, testResultData);
    return response.data;
  },

  // Staff: Get all donation requests
  getAllDonationRequests: async () => {
    const response = await api.get('/api/donations/requests');
    return response.data;
  },
  // Staff: Get donation by ID
  getDonationById: async (donationId) => {
    const response = await api.get(`/api/donations/${donationId}`);
    return response.data;
  },

  // Admin: Get all donations (includes completed and historical data)
  getAllDonations: async () => {    const response = await api.get('/api/admin/donations');
    return response.data;
  }
};

export default donationService;
