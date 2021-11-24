import axios from 'axios';

const axiosApiInstance = axios.create();

axiosApiInstance.defaults.baseURL = 'http://localhost:4000';
axiosApiInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosApiInstance;