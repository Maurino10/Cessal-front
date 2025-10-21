
import axios from '@/services/axiosInstance.js';


export default {
    getAllPost () {
        return axios.get('/public/posts');
    }
}