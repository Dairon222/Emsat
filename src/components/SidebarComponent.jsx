/* eslint-disable react/prop-types */
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../context/ThemeContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";
import SchoolIcon from "@mui/icons-material/School";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ManIcon from "@mui/icons-material/Man";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import senaLogo from "../assets/logo_sena.png";
import BlindsClosedIcon from "@mui/icons-material/BlindsClosed";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useSede } from "../context/SedeContext";

const SidebarComponent = ({ drawerWidth, title, isAdmin }) => {
  const { userName } = useSede();
  const { darkMode, toggleDarkMode } = useThemeContext();
  const theme = useTheme();

  const navLinks = [
    { text: "Inicio", path: "/dashboard", icon: <HomeIcon /> },
    { text: "Herramientas", path: "/inventory", icon: <BuildIcon /> },
    { text: "Usuarios", path: "/users", icon: <PeopleIcon /> },
    { text: "Préstamos", path: "/loans", icon: <AssignmentIcon /> },
    { text: "Fichas", path: "/fichas", icon: <SchoolIcon /> },
    { text: "Ambientes", path: "/enviroments", icon: <MeetingRoomIcon /> },
    { text: "Roles", path: "/roles", icon: <ManIcon /> },
    { text: "Historial", path: "/historial", icon: <HistoryIcon /> },
  ];

  const navLinksAdmin = [
    {
      text: "Administración",
      path: "/admin",
      icon: <AdminPanelSettingsIcon />,
    },
    { text: "Sedes", path: "/info-sedes", icon: <BlindsClosedIcon /> },
    { text: "Usuarios", path: "/info-users", icon: <PeopleIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      }}
    >
      <Box>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <Link
              to={isAdmin ? "/admin" : "/dashboard"}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={senaLogo}
                alt="Logo"
                style={{ width: 50, height: "auto" }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", ml: 2 }}
              >
                {title}
              </Typography>
            </Link>
          </Box>
        </Toolbar>
        <List sx={{ mt: 3 }}>
          {(isAdmin ? navLinksAdmin : navLinks).map((link) => (
            <ListItem
              button
              key={link.text}
              component={Link}
              to={link.path}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                transition: "all 0.3s",
                textDecoration: "none",
                listStyle: "none",
                color: theme.palette.text.primary,
                "&:hover": {
                  borderRadius: 1,
                  transform: "scale(1.1)",
                  ".MuiListItemIcon-root": { color: "primary.main" },
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer del Sidebar con User y Dark Mode */}
      <Box sx={{ p: 2 }}>
        <Divider />
        <List>
          {/* Usuario */}
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText primary={userName || "Invitado"} />
          </ListItem>

          {/* Botón de Modo Oscuro */}
          <ListItem>
            <ListItemIcon>
              {darkMode ? (
                <LightModeIcon sx={{ color: theme.palette.text.primary }} />
              ) : (
                <DarkModeIcon sx={{ color: theme.palette.text.primary }} />
              )}
            </ListItemIcon>
            <ListItemText primary={darkMode ? "Modo Claro" : "Modo Oscuro"} />
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarComponent;
