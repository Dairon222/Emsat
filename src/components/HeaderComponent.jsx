/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSede } from "../context/SedeContext";

const HeaderComponent = ({ title }) => {
  const { sede } = useSede();

  const navLinks = [{ text: "Salir", path: "/", icon: <LogoutIcon /> }];

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", ml: "230px" }}
            >
              {title}
            </Typography>
          </Link>
        </Box>

        {/* Navegación */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 5 }}>
          {navLinks.map((link) => (
            <Button
              key={link.text}
              component={Link}
              to={link.path}
              color="inherit"
              startIcon={link.icon}
              sx={{
                textTransform: "none",
                p:1.5,
                "&:hover": {
                  backgroundColor: "#ffffff20",
                  borderRadius: 1,
                },
              }}
            >
              {link.text}
            </Button>
          ))}

          {/* Sede Seleccionada */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {sede || "Sede no seleccionada"}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
