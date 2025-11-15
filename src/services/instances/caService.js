import axios from '@/services/axiosInstance.js';


export default {
    getAllCA(search, page) {
        return axios.get(`/ca?search=${search}&page=${page}`);
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
    
    listCA() {
        return axios.get('/ca-list');
    },

}