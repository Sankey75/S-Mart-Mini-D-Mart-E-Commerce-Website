import api from './api';

export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  }
};
