import axios from '@/services/axiosInstance.js';


export default {
    login (user) {
        return axios.post('/login', user);
    },

    register (user) {
        return axios.post('/register', user);
    },
    
    logout () {
        return axios.post('/logout');
    },

    loginAdmin (user) {
        return axios.post('/admin/login', user);
    },

    logoutAdmin () {
        return axios.post('/admin/logout');
    },

}