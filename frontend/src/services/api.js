import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Profile API
export const getProfile = () => api.get('/api/profile');
export const createProfile = (data) => api.post('/api/profile', data);
export const updateProfile = (data) => api.put('/api/profile', data);
export const deleteProfile = () => api.delete('/api/profile');

// Query API
export const getProjects = (skill = '') => {
  const params = skill ? { skill } : {};
  return api.get('/api/projects', { params });
};

export const getTopSkills = () => api.get('/api/skills/top');
export const searchProfile = (query) => api.get('/api/search', { params: { q: query } });

// Health check
export const healthCheck = () => api.get('/health');

export default api;
