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
  signout: async () => {
    try {
      const response = await api.post('/auth/signout');
      if (!response.data.hasError) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // window.location.href = '/login';
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/getCurrentUser');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is authenticated
  // isAuthenticated: () => {
  //   return !!localStorage.getItem('token');
  // },

   // Get current user
  // getCurrentUser: async () => {
  //   try {
  //     const response = await api.get('/auth/getCurrentUser');
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // Enhanced authentication check with API verification
  isAuthenticated: async () => {
    try {
      // First check if token exists
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      // Verify token with backend
      await authService.getCurrentUser();
      return true;
    } catch (error) {
      // Token is invalid, clean up
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  },

  // Synchronous version for quick checks (less secure)
  hasToken: () => {
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