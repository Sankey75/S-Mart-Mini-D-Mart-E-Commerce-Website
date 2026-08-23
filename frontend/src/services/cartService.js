import api from './api';

export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post(`/cart/add?productId=${productId}&quantity=${quantity}`);
    return response.data;
  },
  updateCartItem: async (productId, quantity) => {
    const response = await api.put(`/cart/update?productId=${productId}&quantity=${quantity}`);
    return response.data;
  },
  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  }
};
