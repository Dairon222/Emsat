/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from "react";

const SedeContext = createContext();

export const useSede = () => useContext(SedeContext);

const SedeProvider = ({ children }) => {
  const [sede, setSede] = useState(localStorage.getItem("selectedSede") || "");

  const updateSede = (newSede) => {
    setSede(newSede);
    localStorage.setItem("selectedSede", newSede);
  };

  return (
    <SedeContext.Provider value={{ sede, updateSede }}>
      {children}
    </SedeContext.Provider>
  );
};

export default SedeProvider;
