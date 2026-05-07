import api from './api.js';

const customersService = {
  fetchCustomers: async () => {
    const response = await api.get('/customers');
    return response.data;
  },
  createCustomer: async (payload) => {
    const response = await api.post('/customers', payload);
    return response.data;
  },
  updateCustomer: async (id, payload) => {
    const response = await api.put(`/customers/${id}`, payload);
    return response.data;
  },
  deleteCustomer: async (id) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  },
};

export default customersService;
