/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";

const SedeContext = createContext();

export const useSede = () => {
  return useContext(SedeContext);
};

const SedeProvider = ({ children }) => {
  const [sede, setSede] = useState(() => localStorage.getItem("sede") || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const updateSede = (newSede) => {
    setSede(newSede);
    localStorage.setItem("sede", newSede);
  };

  const login = (newToken, newSede) => {
    setToken(newToken);
    setSede(newSede);
    localStorage.setItem("token", newToken);
    localStorage.setItem("sede", newSede);
  };


  const logout = async (navigate) => {
    try {
      await api.post("/logout"); // Llamada a la api para usar el logout
  
      console.log("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.response?.data || error.message);
    }
  
    // Limpiar el estado y el almacenamiento local
    setSede(null);
    setToken(null);
    localStorage.removeItem("sede");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  
    // Redirigir al login
    navigate("/");
  };

  return (
    <SedeContext.Provider value={{ sede, token, updateSede, login, logout }}>
      {children}
    </SedeContext.Provider>
  );
};

export default SedeProvider;
