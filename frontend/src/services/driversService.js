import api from './api.js';

const driversService = {
  fetchDrivers: async () => {
    const response = await api.get('/drivers');
    return response.data;
  },
  createDriver: async (payload) => {
    const response = await api.post('/drivers', payload);
    return response.data;
  },
  updateDriver: async (id, payload) => {
    const response = await api.put(`/drivers/${id}`, payload);
    return response.data;
  },
  deleteDriver: async (id) => {
    const response = await api.delete(`/drivers/${id}`);
    return response.data;
  },
};

export default driversService;
