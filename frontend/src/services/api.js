import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const dietAPI = {
  recommendDiet: async (userData) => {
    const response = await api.post('/recommend-diet', userData);
    return response.data;
  },
  
  getUserDietPlans: async (userId) => {
    const response = await api.get(`/diet-plans/${userId}`);
    return response.data;
  }
};

export default api;