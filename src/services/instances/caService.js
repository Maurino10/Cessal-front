import axios from '@/services/axiosInstance.js';


export default {
    getAllCA() {
        return axios.get('/ca');
    },

    createCA(ca) {
      return axios.post('/ca', ca);
    },
    
    updateCA(id, ca) {
        return axios.put(`/ca/${id}`, ca);
    },

    deleteCA(id) {
        return axios.delete(`/ca/${id}`);
    },
    
    filterCA(word, idProvince) {
        return axios.get('/ca-filter', {
          params: {
            word: word,
            province: idProvince
          }
        });
    },
}