/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSede } from "../context/SedeContext";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ title }) => {

  const navigate = useNavigate();
  const { sede, logout } = useSede();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirigir al login
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
          <Button
            onClick={handleLogout} // 🔹 Ahora el botón de "Salir" cierra sesión
            color="inherit"
            startIcon={<LogoutIcon />}
            sx={{
              textTransform: "none",
              p: 1.5,
              "&:hover": { backgroundColor: "#ffffff20", borderRadius: 1 },
            }}
          >
            Salir
          </Button>

          {/* 🔹 Mostrar la sede seleccionada */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {sede ? sede : "Selecciona una sede"}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
