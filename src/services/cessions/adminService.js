import axios from '@/services/axiosInstance.js';

export default {

    getCession (idCession) {
        return axios.get(`/cessions/${idCession}`);
    },

    getAllCession(tpi, statut, dateStart, dateEnd, page) {
        return axios.get(`/cessions?tpi=${tpi}&statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}&page=${page}`);
    },

    getAllCessionLenderByCession (idCession) {
        return axios.get(`/cessions/${idCession}/lenders`);
    },

    getAllCessionBorrowerByCession (idCession) {
        return axios.get(`/cessions/${idCession}/borrowers`);
    },

    
    getAllCessionJustificatifByCession (idCession) {
        return axios.get(`/cessions/${idCession}/justificatifs`);
    },


    showCessionJustificatif (idCession, idCessionJustificatif) {
        return axios.get(`/cessions/${idCession}/justificatifs/${idCessionJustificatif}`, {
            responseType: 'blob'
        });
    },

    exportExcelCessions (tpi, statut, dateStart, dateEnd) {
        return axios.get(`/cessions/export-excel?tpi=${tpi}&statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            responseType: 'blob'   // très important
        });
    },

    exportPdfCessions (tpi, statut, dateStart, dateEnd) {
        return axios.get(`/cessions/export-pdf?tpi=${tpi}&statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            responseType: 'blob'   // très important
        });
    },

};