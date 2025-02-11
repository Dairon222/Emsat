/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from "react";

const SedeContext = createContext();

export const useSede = () => useContext(SedeContext);

const SedeProvider = ({ children }) => {
  const [sede, setSede] = useState(() => {
    // Obtener la sesión desde el almacenamiento local al iniciar
    const storedSede = localStorage.getItem("selectedSede");
    return storedSede ? JSON.parse(storedSede) : null;
  });

  // Actualizar la sede en el estado y en localStorage
  const updateSede = (newSede) => {
    setSede(newSede);
    localStorage.setItem("selectedSede", JSON.stringify(newSede));
  };

  // Función para cerrar sesión
  const logout = () => {
    setSede(null);
    localStorage.removeItem("selectedSede");
  };

  // Si el usuario ya está autenticado, mantiene la sesión activa
  useEffect(() => {
    const storedSede = localStorage.getItem("selectedSede");
    if (storedSede) {
      setSede(JSON.parse(storedSede));
    }
  }, []);

  return (
    <SedeContext.Provider value={{ sede, updateSede, logout }}>
      {children}
    </SedeContext.Provider>
  );
};

export default SedeProvider;
