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
  const [sede, setSede] = useState(() => sessionStorage.getItem("sede") || null);
  const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);
  const [userName, setUserName] = useState(() => sessionStorage.getItem("userName") || "Desconocido");
  
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserName(sessionStorage.getItem("userName") || "Desconocido");
  }, []);

  const updateSede = (newSede) => {
    setSede(newSede);
    localStorage.setItem("sede", newSede);
  };

  const login = (newToken, newSede, newUserName) => {
    setToken(newToken);
    setSede(newSede);
    setUserName(newUserName);
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("sede", newSede);
    sessionStorage.setItem("userName", newUserName);
  };

  const logout = async (navigate) => {
    try {
      await api.post("/logout"); // Llamada a la API para cerrar sesión
      console.log("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.response?.data || error.message);
    }

    setSede(null);
    setToken(null);
    setUserName("Desconocido");
    sessionStorage.removeItem("sede");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");

    // Redirigir al login
    navigate("/");
  };

  return (
    <SedeContext.Provider value={{ sede, token, userName, updateSede, login, logout }}>
      {children}
    </SedeContext.Provider>
  );
};

export default SedeProvider;
