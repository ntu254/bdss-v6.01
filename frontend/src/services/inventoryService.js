// services/inventoryService.js - Inventory management services
import api from './api';

export const inventoryService = {
  // Staff/Admin: Get all blood inventory
  getAllInventory: async () => {
    const response = await api.get('/api/inventory');
    return response.data;
  },

  // Staff/Admin: Get inventory summary statistics
  getInventorySummary: async () => {
    const response = await api.get('/api/inventory/summary');
    return response.data;
  },

  // Staff/Admin: Get recent blood inventory additions
  getRecentInventory: async () => {
    const response = await api.get('/api/inventory/recent');
    return response.data;
  }
};

export default inventoryService;
