import api from './api.js';

const usersService = {
  fetchUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  createUser: async (payload) => {
    const response = await api.post('/users', payload);
    return response.data;
  },
  updateUser: async (id, payload) => {
    const response = await api.put(`/users/${id}`, payload);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default usersService;
