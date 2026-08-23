import api from './api';

export const productService = {
  getAllProducts: async (search = '') => {
    const response = await api.get(`/products${search ? `?search=${search}` : ''}`);
    return response.data;
  },
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  createProduct: async (product) => {
    const response = await api.post('/products', product);
    return response.data;
  }
};
