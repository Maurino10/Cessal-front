
import axios from '@/services/axiosInstance.js';

export default {
     
    getAllCessionByTPI(idTPI, statut, dateStart, dateEnd, page) {
        return axios.get(`/administrateur/local/tpi/${idTPI}/cessions?statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}&page=${page}`);
    },

    getCession(idCession) {
        return axios.get(`/administrateur/local/cessions/${idCession}`);
    },

    getAllCessionLenderByCession (idCession) {
        return axios.get(`/administrateur/local/cessions/${idCession}/lenders`);
    },

    getAllCessionBorrowerByCession (idCession) {
        return axios.get(`/administrateur/local/cessions/${idCession}/borrowers`);
    },

    
    getAllCessionJustificatifByCession(idCession) {
        return axios.get(`/administrateur/local/cessions/${idCession}/justificatifs`);
    },


    showCessionJustificatif(idCession, idCessionJustificatif) {
        return axios.get(`/administrateur/local/cessions/${idCession}/justificatifs/${idCessionJustificatif}`, {
            responseType: 'blob'
        });
    },

    exportExcelCessionsByTPI (idTPI, statut, dateStart, dateEnd) {
        return axios.get(`/administrateur/local/tpi/${idTPI}/cessions/export-excel?statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            responseType: 'blob'   // très important
        });
    },

    exportPdfCessionsByTPI (idTPI, statut, dateStart, dateEnd) {
        return axios.get(`/administrateur/local/tpi/${idTPI}/cessions/export-pdf?statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            responseType: 'blob'   // très important
        });
    },
}