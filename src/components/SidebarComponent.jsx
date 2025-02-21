/* eslint-disable react/prop-types */
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from '@mui/icons-material/History';

import SchoolIcon from "@mui/icons-material/School";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ManIcon from '@mui/icons-material/Man';

import senaLogo from "../assets/logo_sena.png";

const SidebarComponent = ({ drawerWidth, title }) => {
  const navLinks = [
    { text: "Inicio", path: "/dashboard", icon: <HomeIcon /> },
    { text: "Inventario", path: "/inventory", icon: <InventoryIcon /> },
    { text: "Usuarios", path: "/users", icon: <PeopleIcon /> },
    { text: "Préstamos", path: "/loans", icon: <AssignmentIcon /> },
    { text: "Fichas", path: "/fichas", icon: <SchoolIcon /> },
    { text: "Ambientes", path: "/enviroments", icon: <MeetingRoomIcon /> },
    { text: "Roles", path: "/roles", icon: <ManIcon /> },
    { text: "Historial", path: "/historial", icon: <HistoryIcon /> },
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
        },
      }}
    >
      <Toolbar>
        {/* Logo y Título */}
        <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
          <Link
            to="/dashboard"
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
      <List>
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.text}
            component={Link}
            to={link.path}
            color="inherit"
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "black",
                borderRadius: 1,
              },
            }}
          >
            <ListItemIcon sx={{ fontWeight: "bold" }}>{link.icon}</ListItemIcon>
            <ListItemText
              primary={link.text}
              sx={{
                textDecoration: "none",
                listStyle: "none",
                color: "black",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarComponent;
