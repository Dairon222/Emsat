/* eslint-disable react/prop-types */
import { Box, CssBaseline, Toolbar, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";
import { useThemeContext } from "../context/ThemeContext";

const drawerWidth = 225;

const Layout = ({ children, isAdmin = false }) => {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SidebarComponent
        drawerWidth={drawerWidth}
        title="SGAH"
        isAdmin={isAdmin}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <HeaderComponent />
        <Toolbar />
        
        <IconButton
          onClick={toggleDarkMode}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {children}
      </Box>
    </Box>
  );
};

export default Layout;
