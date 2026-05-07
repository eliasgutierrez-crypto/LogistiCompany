import api from './api.js';

const trackingService = {
  fetchTracking: async () => {
    const response = await api.get('/tracking');
    return response.data;
  },
  createTracking: async (payload) => {
    const response = await api.post('/tracking', payload);
    return response.data;
  },
  updateTracking: async (id, payload) => {
    const response = await api.put(`/tracking/${id}`, payload);
    return response.data;
  },
  deleteTracking: async (id) => {
    const response = await api.delete(`/tracking/${id}`);
    return response.data;
  },
};

export default trackingService;
