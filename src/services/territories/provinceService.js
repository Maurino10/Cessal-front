import axios from '@/services/axiosInstance.js';

export default {
    getAllProvince () {
        return axios.get('/provinces');
    },

    createProvince (province) {
      return axios.post('/provinces', province);
    },
    
    updateProvince (id, province) {
        return axios.put(`/provinces/${id}`, province);
    },

    deleteProvince (id) {
        return axios.delete(`/provinces/${id}`);
    },
}