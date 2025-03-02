/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import senaLogo from "../assets/logo_sena.png";
import { useSede } from "../context/SedeContext";
import api from "../api/axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();
  const { login } = useSede();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      showSnackbar("Por favor completa todos los campos.", "warning");
      return;
    }

    try {
      const { data } = await api.post("login-sede", {
        username: credentials.username,
        password: credentials.password,
      });

      if (data?.user && data?.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("sede", data.user.sede);
        login(data.token, data.user.sede);
        showSnackbar("Inicio de sesión exitoso.", "success");
        navigate((data.user.sede === "Administrador" ? "/admin" : "/dashboard"));
      } else {
        throw new Error("Credenciales incorrectas o datos incompletos.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      showSnackbar("Verifica tus credenciales.", "error");
    }
  };

  const handleResetPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(white, rgb(22, 139, 11))",
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 3,
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Box mb={3}>
          <img src={senaLogo} alt="Logo SENA" style={{ width: 80 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Inicio de Sesión
          </Typography>
          <Typography variant="body1" color="gray" fontStyle="italic">
            Software de gestión de ambientes y herramientas
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            name="username"
            label="Nombre de usuario"
            value={credentials.username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            label="Contraseña"
            value={credentials.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#03b12fcc",
              color: "white",
              fontSize: "1em",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 1,
              transition: "background-color 0.3s ease",
              "&:hover": { bgcolor: "#333" },
            }}
            fullWidth
          >
            Iniciar Sesión
          </Button>
          <Typography variant="body2" mt={2}>
            <a
              href="/forgot-password"
              style={{
                color: "red",
                textDecoration: "none",
                transition: "color 0.3s",
                "&:hover": { color: "black", scale: 1.1 },
              }}
            >
              ¿Recuperar contraseña?{" "}
            </a>
          </Typography>
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
