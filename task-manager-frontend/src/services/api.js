import axios from "axios";
const api = axios.create({
    baseURL: "https://secure-task-manager-nyix.onrender.com/api",
    withCredentials: true,
});
export default api;
