/* eslint-disable react/prop-types */
import { Box, CssBaseline, Toolbar } from "@mui/material";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";

const drawerWidth = 240; // Ancho de la barra lateral

const Layout = ({ children, sede }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Barra lateral */}
      <SidebarComponent drawerWidth={drawerWidth} title="Emsat" />

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <HeaderComponent sede={sede}  />

        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default Layout;
