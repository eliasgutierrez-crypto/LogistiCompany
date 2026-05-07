import api from './api.js';

const paymentsService = {
  fetchPayments: async () => {
    const response = await api.get('/payments');
    return response.data;
  },
  createPayment: async (payload) => {
    const response = await api.post('/payments', payload);
    return response.data;
  },
  updatePayment: async (id, payload) => {
    const response = await api.put(`/payments/${id}`, payload);
    return response.data;
  },
  deletePayment: async (id) => {
    const response = await api.delete(`/payments/${id}`);
    return response.data;
  },
};

export default paymentsService;
