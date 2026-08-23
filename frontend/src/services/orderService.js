import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  createRazorpayOrder: async (amount) => {
    const response = await api.post('/payment/create-order', { amount });
    return response.data;
  },
  getUserOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  }
};
