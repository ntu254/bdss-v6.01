// services/bloodService.js - Blood related services
import api from './api';

export const bloodService = {
  // Public: Get all blood types
  getBloodTypes: async () => {
    const response = await api.get('/api/blood-types');
    return response.data;
  },
  // Public: Get blood compatibility rules (with pagination)
  getBloodCompatibility: async (page = 0, size = 10, sort = 'id,asc') => {
    const response = await api.get('/api/blood-compatibility', {
      params: { page, size, sort }
    });
    return response.data; // Returns Page<BloodCompatibilityDetailResponse>
  },
  
  // Public: Get all blood compatibility rules (without pagination)
  getAllBloodCompatibility: async () => {
    const response = await api.get('/api/blood-compatibility', {
      params: { page: 0, size: 1000 } // Get large page to simulate "all"
    });
    return response.data.content; // Extract content array from Page
  },

  // Admin: Create new blood type
  createBloodType: async (bloodTypeData) => {
    const response = await api.post('/api/blood-types', bloodTypeData);
    return response.data;
  },

  // Admin: Update blood type
  updateBloodType: async (id, bloodTypeData) => {
    const response = await api.put(`/api/blood-types/${id}`, bloodTypeData);
    return response.data;
  },

  // Admin: Delete blood type
  deleteBloodType: async (id) => {
    const response = await api.delete(`/api/blood-types/${id}`);
    return response.data;
  },

  // Admin: Create blood compatibility rule
  createBloodCompatibility: async (compatibilityData) => {
    const response = await api.post('/api/blood-compatibility', compatibilityData);
    return response.data;
  },

  // Admin: Update blood compatibility rule
  updateBloodCompatibility: async (id, compatibilityData) => {
    const response = await api.put(`/api/blood-compatibility/${id}`, compatibilityData);
    return response.data;
  },
  // Admin: Delete blood compatibility rule
  deleteBloodCompatibility: async (id) => {
    const response = await api.delete(`/api/blood-compatibility/${id}`);
    return response.data;
  }
};

export default bloodService;
