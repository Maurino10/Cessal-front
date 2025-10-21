import axios from '@/services/axiosInstance.js';



export default {
    getAllTPI() {
        return axios.get('/tpi');
    },

    createTPI(tpi) {
      return axios.post('/tpi', tpi);
    },
    
    updateTPI(id, tpi) {
        return axios.put(`/tpi/${id}`, tpi);
    },

    deleteTPI(id) {
        return axios.delete(`/tpi/${id}`);
    },

    filterTPI(word, idProvince, idRegion, idDistrict) {
        return axios.get('/tpi-filter', {
          params: {
            word: word,
            province: idProvince,
            region: idRegion,
            district: idDistrict
          }
        });
    },

    listTPI () {
      return axios.get('/public/tpi');
    },

    importTPI (formData) {
      return axios.post('/tpi/import', formData, {
        headers:  {
            'Content-Type': 'multipart/form-data'
        },
      })
    }
}