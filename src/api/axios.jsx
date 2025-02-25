import axios from "axios";

// Configuración de la base URL para la API
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Base general para la API
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
