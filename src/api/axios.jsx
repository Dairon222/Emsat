import axios from "axios";

// Configuración de la base URL para la API
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Base general para la API
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const deleteData = async (endpoint, id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`, {
      headers: { "Content-Type": "application/json" }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar:", error);
    throw error;
  }
};

export default api;
