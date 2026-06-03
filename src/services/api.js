import axios from "axios";

const api = axios.create({
  baseURL:
    "https://askdrip-backend.onrender.com/api/v1"
});

export default api;