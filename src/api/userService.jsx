import api from "./axios";

// Obtener lista de usuarios
export const fetchUsers = async () => {
  try {
    const response = await api.get("/usuario"); // Endpoint definido en Laravel
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await api.post("/usuario", userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};
