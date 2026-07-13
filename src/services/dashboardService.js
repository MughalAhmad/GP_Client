import api from '../utils/axios';

export const dashboardService = {
  dashboardCards: async () => {
    try {
      const response = await api.get('/dashboard/cards');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};