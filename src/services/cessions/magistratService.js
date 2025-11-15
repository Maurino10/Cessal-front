
import axios from '@/services/axiosInstance.js';

export default {

// --------------------------------------------- Cession

    getAllCessionByMagistrat(idUser, search, statut, page) {
        return axios.get(`/magistrat/${idUser}/cessions?search=${search}&statut=${statut}&page=${page}`);
    },

    getCession(idCession) {
        return axios.get(`/magistrat/cessions/${idCession}`);
    },

    acceptCession(idCession) {
        return axios.post(`/magistrat/cessions/${idCession}/accepted`);
    },

    refuseCession(idCession) {
        return axios.post(`/magistrat/cessions/${idCession}/refused`);
    },

// --------------------------------------------- Lender

    getAllCessionLenderByCession (idCession) {
        return axios.get(`/magistrat/cessions/${idCession}/lenders`);
    },

// --------------------------------------------- Borrower

    getAllCessionBorrowerByCession (idCession) {
        return axios.get(`/magistrat/cessions/${idCession}/borrowers`);
    },

    storeCessionBorrowerQuota (idCession, idCessionBorrower, data) {
        return axios.post(`/magistrat/cessions/${idCession}/borrowers/${idCessionBorrower}/quota`, data);
    },

    editCessionBorrowerQuota (idCession, idCessionBorrower, idCessionBorrowerQuota, data) {
        return axios.put(`/magistrat/cessions/${idCession}/borrowers/${idCessionBorrower}/quota/${idCessionBorrowerQuota}`, data);
    },

// --------------------------------------------- Justificatives

    getAllCessionJustificatifByCession(idCession) {
        return axios.get(`/magistrat/cessions/${idCession}/justificatifs`);
    },


    showCessionJustificatif(idCession, idCessionJustificatif) {
        return axios.get(`/magistrat/cessions/${idCession}/justificatifs/${idCessionJustificatif}`, {
            responseType: 'blob'
        });
    },

// --------------------------------------------- Ordonnances

    storeNumeroOrdonnance(idCession, data) {
        return axios.post(`/magistrat/cessions/${idCession}/ordonnance`, data);
    },

    editNumeroOrdonnance(idCession, idCessionOrdonnance, data) {
        return axios.put(`/magistrat/cessions/${idCession}/ordonnance/${idCessionOrdonnance}`, data);
    },

}