/* eslint-disable react/prop-types */
import { Box, CssBaseline, Toolbar } from "@mui/material";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";

const drawerWidth = 225; // Ancho de la barra lateral

const Layout = ({ children, isAdmin = false }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Barra lateral */}
      <SidebarComponent drawerWidth={drawerWidth} title="Emsat" isAdmin={isAdmin} />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* 🔹 Pasar la sede obtenida del contexto */}
        <HeaderComponent />

        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
