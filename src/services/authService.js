import api from '../utils/axios';

export const authService = {
  // Sign up new user
  signup: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Sign in existing user
  signin: async (credentials) => {
    try {
      const response = await api.post('/auth/signin', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Sign out user
  signout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get app password for a user
  getAppPassword: async () => {
    try {
      const response = await api.get(`/auth/app-password`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Save app password for a user
  saveAppPassword: async (appPassword) => {
    try {
      const response = await api.post('/auth/app-password', { appPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};