import api from './api';

export const fulfillmentService = {
  getAllOrders: async (status = '') => {
    const url = status ? `/fulfillment/orders?status=${status}` : '/fulfillment/orders';
    const response = await api.get(url);
    return response.data;
  },
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/fulfillment/orders/${orderId}/status?status=${status}`);
    return response.data;
  }
};
