/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import senaLogo from "../assets/logo_sena.png";
import { useSede } from "../context/SedeContext";
import api from "../api/axios";

const Login = () => {
  const [sedes, setSedes] = useState([]);
  const [selectedSede, setSelectedSede] = useState("");
  const [selectedNumeroSede, setSelectedNumeroSede] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("sede", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSedes(response.data);
      } catch (error) {
        console.error("Error al cargar sedes:", error);
        setSnackbar({
          open: true,
          message: "No se pudieron cargar las sedes.",
          severity: "error",
        });
      }
    };

    fetchSedes();
  }, []);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

  const { login } = useSede();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showSnackbar("Por favor completa todos los campos.", "warning");
      return;
    }

    try {
      const response = await api.post("login-sede", {
        username,
        contrasena: password,
      });

      const userData = response?.data?.user;
      const token = response?.data?.token;

      if (userData && token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("sede", userData.sede || selectedSede);

        login(token, userData.sede || selectedSede);
        showSnackbar("Inicio de sesión exitoso.", "success");

        navigate(userData.id === 10 ? "/users" : "/dashboard");
      } else {
        throw new Error("Credenciales incorrectas o datos incompletos.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      showSnackbar("Verifica tus credenciales.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(white, rgb(22, 139, 11))",
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <img
            src={senaLogo}
            alt="Logo SENA"
            style={{ width: 80, height: "auto" }}
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "black", fontWeight: "bold" }}
          >
            Inicio de Sesión
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "gray", fontStyle: "italic" }}
          >
            Software de gestión de ambientes y herramientas
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            id="username"
            label="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            type="password"
            id="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#03b12fcc",
              color: "white",
              fontSize: "1em",
              fontWeight: "bold",
              padding: "15px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
              "&:hover": { backgroundColor: "#333" },
            }}
            fullWidth
          >
            Iniciar Sesión
          </Button>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Login;
