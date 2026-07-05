import api from '../utils/axios';

export const emailService = {
  // Find emails for multiple domains
  findEmails: async (domains) => {
    try {
      const response = await api.post('/findEmail/getEmails', { 
        domains: domains.filter(Boolean) // Remove empty strings
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Find emails for a single domain
  findEmailsForDomain: async (domain) => {
    try {
      const response = await api.post('/find-emails', { 
        domains: [domain]
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get email history (if your backend supports it)
  getEmailHistory: async () => {
    try {
      const response = await api.get('/email-history');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};