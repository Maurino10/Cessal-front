import axios from '@/services/axiosInstance.js';


export default {
    getDashboard(dateStart, dateEnd) {
        return axios.get(`/dashboard?dateStart=${dateStart}&dateEnd=${dateEnd}`);
    },

    getDetailsCA(idCA, dateStart, dateEnd) {
        return axios.get(`/dashboard/ca/${idCA}?dateStart=${dateStart}&dateEnd=${dateEnd}`);
    }
}