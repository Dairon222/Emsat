/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";

const HeaderComponent = ({ title }) => {
  const navLinks = [
    { text: "Inicio", path: "/dashboard", icon: <HomeIcon /> },
    { text: "Inventario", path: "/inventory", icon: <InventoryIcon /> },
    { text: "Usuarios", path: "/users", icon: <PeopleIcon /> },
    { text: "Préstamos", path: "/loans", icon: <AssignmentIcon /> },
    { text: "Salir", path: "/", icon: <LogoutIcon /> },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Link>
        <Box sx={{ display: "flex", gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.text}
              component={Link}
              to={link.path}
              color="inherit"
              startIcon={link.icon}
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#ffffff20",
                  borderRadius: 1,
                },
              }}
            >
              {link.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
