import axios from 'axios';

const API_BASE_URL = 'https://secure-task-manager-nyix.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;