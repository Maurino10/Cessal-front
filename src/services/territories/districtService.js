import axios from '@/services/axiosInstance.js';


export default {
    getAllDistrict() {
        return axios.get('/districts');
    },

    createDistrict(district) {
      return axios.post('/districts', district);
    },
    
    updateDistrict(id, district) {
        return axios.put(`/districts/${id}`, district);
    },

    deleteDistrict(id) {
        return axios.delete(`/districts/${id}`);
    },

    filterDistrict(word, idProvince, idRegion) {
        return axios.get('/districts-filter', {
          params: {
            word: word,
            province: idProvince,
            region: idRegion
          }
        });
    },
}