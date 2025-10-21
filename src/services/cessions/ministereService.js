
import axios from '@/services/axiosInstance.js';

export default {
     
    getAllCessionByTPI(idTPI) {
        return axios.get(`/ministere/tpi/${idTPI}/cessions`);
    },

    filterCessionByTPI(idTPI, statut, dateStart, dateEnd) {
        return axios.get(`/ministere/tpi/${idTPI}/cessions/filter?statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`);
    },

    getCession(idCession) {
        return axios.get(`/ministere/cessions/${idCession}`);
    },

    getAllCessionLenderByCession (idCession) {
        return axios.get(`/ministere/cessions/${idCession}/lenders`);
    },

    getAllCessionBorrowerByCession (idCession) {
        return axios.get(`/ministere/cessions/${idCession}/borrowers`);
    },

    
    getAllCessionJustificatifByCession(idCession) {
        return axios.get(`/ministere/cessions/${idCession}/justificatifs`);
    },


    showCessionJustificatif(idCession, idCessionJustificatif) {
        return axios.get(`/ministere/cessions/${idCession}/justificatifs/${idCessionJustificatif}`, {
            responseType: 'blob'
        });
    },

    exportExcelCessionsByTPI (idTPI, statut, dateStart, dateEnd) {
        return axios.get(`/ministere/tpi/${idTPI}/cessions/export-excel?statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            responseType: 'blob'   // très important
        });
    },

    exportPdfCessionsByTPI (idTPI, statut, dateStart, dateEnd) {
        return axios.get(`/ministere/tpi/${idTPI}/cessions/export-pdf?statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            responseType: 'blob'   // très important
        });
    },
}