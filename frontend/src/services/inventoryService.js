import api from './api';

export const inventoryService = {
  getAllInventory: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },
  getInventoryByProductId: async (productId) => {
    const response = await api.get(`/inventory/${productId}`);
    return response.data;
  }
};
