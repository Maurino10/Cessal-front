
import axios from '@/services/axiosInstance.js';

export default {
     
    getAllCession(tpi, statut, dateStart, dateEnd, page) {
        return axios.get(`/ministere/cessions?tpi=${tpi}&statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}&page=${page}`);
    },

    getCession (idCession) {
        return axios.get(`/ministere/cessions/${idCession}`);
    },

    getAllCessionLenderByCession (idCession) {
        return axios.get(`/ministere/cessions/${idCession}/lenders`);
    },

    getAllCessionBorrowerByCession (idCession) {
        return axios.get(`/ministere/cessions/${idCession}/borrowers`);
    },

    
    getAllCessionJustificatifByCession (idCession) {
        return axios.get(`/ministere/cessions/${idCession}/justificatifs`);
    },


    showCessionJustificatif (idCession, idCessionJustificatif) {
        return axios.get(`/ministere/cessions/${idCession}/justificatifs/${idCessionJustificatif}`, {
            responseType: 'blob'
        });
    },

    exportExcelCessions (tpi, statut, dateStart, dateEnd) {
        return axios.get(`/ministere/cessions/export-excel?tpi=${tpi}&statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            responseType: 'blob'   // très important
        });
    },

    exportPdfCessions (tpi, statut, dateStart, dateEnd) {
        return axios.get(`/ministere/cessions/export-pdf?tpi=${tpi}&statut=${statut}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            responseType: 'blob'   // très important
        });
    },
}