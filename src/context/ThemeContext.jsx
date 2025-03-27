/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderComponent = ({ children }) => {
  // Estado para controlar el modo oscuro
  const [darkMode, setDarkMode] = useState(false);

  // Función para alternar entre modo claro y oscuro
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Configuración del tema
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#388e3c" },
          secondary: { main: "#ef6c00" },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
