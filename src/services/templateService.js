// import api from '../utils/axios';

// export const templateService = {
//   // Create new templet
//   save: async (tempData) => {
//     try {
//       const response = await api.post('/template/save', tempData);
//       return response.data;
//     } catch (error) {
//       throw error;s
//     }
//   },

// //   List templates
// list: async () => {
//     try {
//       const response = await api.get('/template/list');
//       return response.data;
//     } catch (error) {
//       throw error;s
//     }
//   },

// };

import api from "../utils/axios";

export const templateService = {
  // Create Template
  save: async (tempData) => {
    try {
      const response = await api.post("/template/save", tempData);
      return response.data;
    } catch (error) {
      console.log('console.log', error)
      throw error;
    }
  },

  // Get All Templates
  list: async () => {
    try {
      const response = await api.get("/template/list");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get Single Template
  getById: async (id) => {
    try {
      const response = await api.get(`/template/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update Template
  update: async (id, tempData) => {
    try {
      const response = await api.post(`/template/update/${id}`, tempData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete Template
  delete: async (id) => {
    try {
      const response = await api.delete(`/template/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get Dropdown1
  dropdown1: async () => {
    try {
      const response = await api.post("/template/dropdown1");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};