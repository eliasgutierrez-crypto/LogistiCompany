import api from './api.js';

const orderService = {
  fetchOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  fetchOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  createOrder: async (payload) => {
    const response = await api.post('/orders', payload);
    return response.data;
  },
  updateOrder: async (id, payload) => {
    const response = await api.put(`/orders/${id}`, payload);
    return response.data;
  },
  deleteOrder: async (id) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },
};

export default orderService;
