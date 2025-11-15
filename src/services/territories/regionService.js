import axios from '@/services/axiosInstance.js';


export default {
    getAllRegion(search, province, page) {
        return axios.get(`/regions?search=${search}&province=${province}&page=${page}`);
    },

    createRegion(region) {
      return axios.post('/regions', region);
    },
    
    updateRegion(id, region) {
        return axios.put(`/regions/${id}`, region);
    },

    deleteRegion(id) {
        return axios.delete(`/regions/${id}`);
    },
    
    listRegion() {
      return axios.get(`/region-list`);
    }
}