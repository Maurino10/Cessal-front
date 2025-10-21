
import axios from '@/services/axiosInstance.js';

export default {
    getAllGender () {
        return axios.get('/public/genders');
    }
}