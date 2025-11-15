import axios from '@/services/axiosInstance.js';



export default {
    getAllTPI(search, ca, page) {
        return axios.get(`/tpi?search=${search}&ca=${ca}&page=${page}`);
    },

    createTPI(tpi) {
      return axios.post('/tpi', tpi);
    },
    
    updateTPI(id, tpi) {
        return axios.put(`/tpi/${id}`, tpi);
    },

    deleteTPI(id) {
        return axios.delete(`/tpi/${id}`);
    },

    listTPI () {
      return axios.get('/public/tpi');
    },

    importInstance (formData) {
      return axios.post('/instance-import', formData, {
        headers:  {
            'Content-Type': 'multipart/form-data'
        },
      })
    },

    exportModelInstance () {
      return axios.get('/instance-export', {
        responseType: 'blob', // 👈 très important
      });
    },
}