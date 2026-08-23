import api from './api';

export const returnService = {
  createReturnRequest: async (returnData) => {
    const response = await api.post('/returns', returnData);
    return response.data;
  },
  getUserReturns: async () => {
    const response = await api.get('/returns/my-returns');
    return response.data;
  },
  getAllReturns: async () => {
    const response = await api.get('/returns');
    return response.data;
  },
  updateReturnStatus: async (returnId, status) => {
    const response = await api.put(`/returns/${returnId}/status?status=${status}`);
    return response.data;
  }
};
