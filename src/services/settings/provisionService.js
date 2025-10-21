import axios from '@/services/axiosInstance.js';


export default {
    getProvision() {
        return axios.get('/provisions');
    },

    createProvision(provision) {
      return axios.post('/provisions', provision);
    },
    
    updateProvision(id, provision) {
        return axios.put(`/provisions/${id}`, provision);
    },
}