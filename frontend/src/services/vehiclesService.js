import api from './api.js';

const vehiclesService = {
  fetchVehicles: async () => {
    const response = await api.get('/vehicles');
    return response.data;
  },
  createVehicle: async (payload) => {
    const response = await api.post('/vehicles', payload);
    return response.data;
  },
  updateVehicle: async (id, payload) => {
    const response = await api.put(`/vehicles/${id}`, payload);
    return response.data;
  },
  deleteVehicle: async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  },
};

export default vehiclesService;
