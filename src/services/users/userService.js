import axios from '@/services/axiosInstance.js';


export default {
    getAllInscription(search, post, tpi, page) {
        return axios.get(`/inscriptions?search=${search}&post=${post}&tpi=${tpi}&page=${page}`);
    },

    approveRequest(idUser) {
        return axios.put(`/inscriptions/approve/${idUser}`);
    },

    rejectRequest(idUser) {
        return axios.put(`/inscriptions/reject/${idUser}`);
    },

    getAllUser(search, post, tpi, page) {
        return axios.get(`/users?search=${search}&post=${post}&tpi=${tpi}&page=${page}`);
    },

    getUser(idUser) {
        return axios.get(`/users/${idUser}`);
    },

    getProfil(idProfil) {
        return axios.get(`/users/profil/${idProfil}`);
    },

    updateProfil(idProfil, data) {
        return axios.put(`/users/profil/${idProfil}`, data);
    }
}