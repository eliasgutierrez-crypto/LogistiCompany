import api from './api.js';

const shipmentService = {
  fetchShipments: async () => {
    const response = await api.get('/shipments');
    return response.data;
  },
  fetchShipmentById: async (id) => {
    const response = await api.get(`/shipments/${id}`);
    return response.data;
  },
  updateShipment: async (id, payload) => {
    const response = await api.put(`/shipments/${id}`, payload);
    return response.data;
  },
};

export default shipmentService;
