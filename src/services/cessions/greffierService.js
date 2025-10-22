
import axios from '@/services/axiosInstance.js';

export default {
// --------------------------------------------- Cession
    // createCession (infos, lenders, borrowers) {
    //     return axios.post('/greffier/cessions', {...infos, lenders: lenders, borrowers: borrowers});
    // },

    createCession (data) {
        return axios.post('/greffier/cessions', data);
    },

    updateCession (idCession, cession) {
        return axios.put(`/greffier/cessions/${idCession}`, cession);
    },

    getCession (idCession) {
        return axios.get(`/greffier/cessions/${idCession}`);
    },

    getCessionWithHisMagistrat (idCession) {
        return axios.get(`/greffier/cessions/${idCession}/assign`);
    },

    getAllCessionByGreffier (idUser) {
        return axios.get(`/greffier/${idUser}/cessions`);
    },

    cessionIsSigned(idCession) {
        return axios.post(`/greffier/cessions/${idCession}/signed`);
    },

    generateDeclaration (idCession, idCessionBorrower, idCessionReference) {
        return axios.get(`/greffier/cessions/${idCession}/borrowers/${idCessionBorrower}/references/${idCessionReference}/export-declaration`, {
            responseType: 'blob'   // très important
        });
    },

// --------------------------------------------- Lenders

    createCessionLender (idCession, lender) {
        return axios.post(`/greffier/cessions/${idCession}/lenders`, lender);
    },

    createCessionLenderExists (idCession, lender) {
        return axios.post(`/greffier/cessions/${idCession}/lenders/exists`, lender);
    },

    createCessionLenderExistsNewAddress (idCession, lender) {
        return axios.post(`/greffier/cessions/${idCession}/lenders/exists/new-address`, lender);
    },

    createCessionLenderEntityExists (idCession, lender) {
        return axios.post(`/greffier/cessions/${idCession}/lenders/entity/exists`, lender);
    },

    getAllCessionLenderByCession (idCession) {
        return axios.get(`/greffier/cessions/${idCession}/lenders`);
    },

    updateCessionLender (idCession, idCessionLender, lender) {
        return axios.put(`/greffier/cessions/${idCession}/lenders/${idCessionLender}`, lender);
    },

    updateCessionLenderNewAddress (idCession, idCessionLender, lender) {
        return axios.put(`/greffier/cessions/${idCession}/lenders/${idCessionLender}/new-address`, lender);
    },

    deleteCessionLender (idCession, idCessionLender) {
        return axios.delete(`/greffier/cessions/${idCession}/lenders/${idCessionLender}`);
    },

// --------------------------------------------- Borrowers

    createCessionBorrower (idCession, borrower) {
        return axios.post(`/greffier/cessions/${idCession}/borrowers`, borrower);
    },

    createCessionBorrowerExists (idCession, borrower) {
        return axios.post(`/greffier/cessions/${idCession}/borrowers/exists`, borrower);
    },

    createCessionBorrowerExistsNewAddress (idCession, borrower) {
        return axios.post(`/greffier/cessions/${idCession}/borrowers/exists/new-address`, borrower);
    },

    getCessionBorrower (idCession, idCessionBorrower) {
        return axios.get(`/greffier/cessions/${idCession}/borrowers/${idCessionBorrower}`);
    },

    updateCessionBorrower (idCession, idCessionBorrower, borrower) {
        return axios.put(`/greffier/cessions/${idCession}/borrowers/${idCessionBorrower}`, borrower);
    },

    updateCessionBorrowerNewAddress (idCession, idCessionBorrower, borrower) {
        return axios.put(`/greffier/cessions/${idCession}/borrowers/${idCessionBorrower}/new-address`, borrower);
    },

    deleteCessionBorrower (idCession, idCessionBorrower) {
        return axios.delete(`/greffier/cessions/${idCession}/borrowers/${idCessionBorrower}`);
    },

    getAllCessionBorrowerByCession (idCession) {
        return axios.get(`/greffier/cessions/${idCession}/borrowers`);
    },

    getAllCessionBorrowerHaveQuotaByCession (idCession) {
        return axios.get(`/greffier/cessions/${idCession}/borrowers/treaty`);
    },

// --------------------------------------------- Justificatives

    storeCessionJustificatifs(idCession, files) {
        return axios.post(`/greffier/cessions/${idCession}/justificatifs`, files, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },

    getAllCessionJustificatifByCession(idCession) {
        return axios.get(`/greffier/cessions/${idCession}/justificatifs`);
    },


    showCessionJustificatif(idCession, idCessionJustificatif) {
        return axios.get(`/greffier/cessions/${idCession}/justificatifs/${idCessionJustificatif}`, {
            responseType: 'blob'
        });
    },

    deleteCessionJustificatif(idCession, idCessionJustificatif) {
        return axios.delete(`/greffier/cessions/${idCession}/justificatifs/${idCessionJustificatif}`);
    },


// --------------------------------------------- Reference
    storeCessionReference(idCession, idCessionBorrower, data) {
        return axios.post(`/greffier/cessions/${idCession}/borrowers/${idCessionBorrower}/references`, data)
    },

    updateCessionReference(idCession, idCessionBorrower, idCessionReference, data) {
        return axios.put(`/greffier/cessions/${idCession}/borrowers/${idCessionBorrower}/references/${idCessionReference}`, data)
    },
// --------------------------------------------- Magistrat

    storeCessionMagistrat (idCession, data) {
        return axios.post(`/greffier/cessions/${idCession}/magistrats`, data);
    },

    editCessionMagistrat (idCession, idCessionMagistrat, data) {
        return axios.put(`/greffier/cessions/${idCession}/magistrats/${idCessionMagistrat}`, data);
    },

    getMagistratByCession (idCession) {
        return axios.get(`/greffier/cessions/${idCession}/magistrats`);
    },

    getAllMagistratByTPI (idTPI) {
        return axios.get(`/greffier/tpi/${idTPI}/magistrats`);
    },
// --------------------------------------------- Person

    checkCIN (cin) {
        return axios.get(`/cession-natural_person/${cin}/check`);
    },

    getAllAddressCessionNaturalPerson(idCessionNaturalPerson) {
        return axios.get(`/cession-natural_person/${idCessionNaturalPerson}`);
    },
        
    getEntityByTPI (idTPI) {
        return axios.get(`/cession-legal_person/tpi/${idTPI}`);
    }

// --------------------------------------------- Draft
    // createDraft (data) {
    //     return axios.post(`/greffier/cessions/temp`, data);
    // },

    // getDraft (idUser) {
    //     return axios.get(`/greffier/cessions/temp/${idUser}`);
    // },

    // deleteDraft (idUser, data) {
    //     return axios.delete(`/greffier/cessions/temp/${idUser}`, { data: data });
    // },
}