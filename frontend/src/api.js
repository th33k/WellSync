import axios from "axios";

const api = axios.create({
  baseURL: "https://wellsync-kna0.onrender.com",
});

export default api;
