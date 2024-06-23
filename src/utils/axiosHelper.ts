import axios from 'axios';

import { HOST_API } from '../config';

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

export default axiosInstance;