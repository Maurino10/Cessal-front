import axios from '@/services/axiosInstance.js';

export default {
    getAllProvince (search, page) {
        return axios.get(`/provinces?search=${search}&page=${page}`);
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

    listProvince () {
        return axios.get(`/province-list`);
    },

}