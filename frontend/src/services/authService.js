import api from './api.js';

const authService = {
  login: async ({ username, password }) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  register: async ({ username, password, role }) => {
    const response = await api.post('/auth/register', { username, password, role });
    return response.data;
  },
};

export default authService;
