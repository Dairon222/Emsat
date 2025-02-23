/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from "react";
import Layout from "../components/Layout";

const SedeContext = createContext();

export const useSede = () => {
  const context = useContext(SedeContext);
  return context;
};

const SedeProvider = ({ children }) => {
  const [sede, setSede] = useState(() => localStorage.getItem("sede") || null);

  const updateSede = (newSede) => {
    setSede(newSede);
    localStorage.setItem("sede", newSede);
  };

  const logout = (navigate) => {
    setSede(null);
    localStorage.removeItem("sede");
    localStorage.removeItem("userId");
  };

  return (
    <SedeContext.Provider value={{ sede, updateSede, logout }}>
      {children}
    </SedeContext.Provider>
  );
};

export default SedeProvider;
