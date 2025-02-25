import axios from "axios";

// Configuración de la base URL para la API
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Base general para la API
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


export default api;