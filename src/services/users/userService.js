import axios from '@/services/axiosInstance.js';


export default {
    getAllInscription() {
        return axios.get('/inscriptions');
    },

    approveRequest(idUser) {
        return axios.put(`/inscriptions/approve/${idUser}`);
    },

    rejectRequest(idUser) {
        return axios.put(`/inscriptions/reject/${idUser}`);
    },

    getAllUser() {
        return axios.get('/users');
    },

    getUser(idUser) {
        return axios.get(`/users/${idUser}`);
    },

}