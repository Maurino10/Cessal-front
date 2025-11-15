import axios from '@/services/axiosInstance.js';


export default {
    getAllDistrict(search, province, region, page) {
        return axios.get(`/districts?search=${search}&province=${province}&region=${region}&page=${page}`);
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

    listDistrict() {
        return axios.get(`/district-list`);
    } 
}