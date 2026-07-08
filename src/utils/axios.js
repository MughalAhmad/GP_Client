import axios from 'axios';
import { API_URL } from '../constants/api';
// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  // timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;