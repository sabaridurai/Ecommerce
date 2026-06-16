import axios from "axios";

export  const backendURL = "http://localhost:8000";

const api = axios.create({
  baseURL: backendURL,
});

// Attach token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  // console.log("Attaching token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;