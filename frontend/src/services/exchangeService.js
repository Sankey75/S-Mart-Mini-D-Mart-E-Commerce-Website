import api from './api';

export const exchangeService = {
  createExchangeRequest: async (exchangeData) => {
    const response = await api.post('/exchanges', exchangeData);
    return response.data;
  },
  getUserExchanges: async () => {
    const response = await api.get('/exchanges/my-exchanges');
    return response.data;
  },
  getAllExchanges: async () => {
    const response = await api.get('/exchanges');
    return response.data;
  },
  updateExchangeStatus: async (exchangeId, status) => {
    const response = await api.put(`/exchanges/${exchangeId}/status?status=${status}`);
    return response.data;
  }
};
