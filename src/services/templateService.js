import api from '../utils/axios';

export const templateService = {
  // Create new templet
  save: async (tempData) => {
    try {
      const response = await api.post('/template/save', tempData);
      return response.data;
    } catch (error) {
      throw error;s
    }
  },

//   List templates
list: async () => {
    try {
      const response = await api.get('/template/list');
      return response.data;
    } catch (error) {
      throw error;s
    }
  },

};