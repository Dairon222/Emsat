/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import senaLogo from "../assets/logo_sena.png";
import { useSede } from "../context/SedeContext";
import api from "../api/axios";
import Captcha from "../components/Captcha";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [selectedIcon, setSelectedIcon] = useState(null);
  const navigate = useNavigate();
  const { login } = useSede();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      showSnackbar("Por favor completa todos los campos.", "warning");
      return;
    }

    if (!selectedIcon) {
      showSnackbar("Selecciona la imagen correcta.", "error");
      return;
    }

    try {
 
      const { data } = await api.post("login-sede", {
        username: credentials.username,
        password: credentials.password,
      });

      if (data?.user && data?.token) {
        const nombreSedeUsuario = data.user.sede;
        const token = data.token;

        const responseSede = await api.get("sede");
        const listaSedes = responseSede.data; 
        const sedeUsuario = listaSedes.find(
          (sede) => sede.nombre_sede === nombreSedeUsuario
        );

        if (sedeUsuario.estado === 0) {
          showSnackbar(
            "La sede está desactivada. No es posible iniciar sesión.",
            "error"
          );
          return;
        }

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("sede", data.user.sede);
        sessionStorage.setItem("userName", data.user.username);
        login(token, data.user.sede, data.user.username);

        showSnackbar("Inicio de sesión exitoso.", "success");

        navigate(
          data.user.sede === "Administrador" ? "/admin" : "/dashboard"
        );
      } else {
        throw new Error("Credenciales incorrectas o datos incompletos.");
      }
    } catch (error) {
      console.error("Error en login:", error);
      showSnackbar("Usuario o contraseña incorrectos.", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

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
          maxWidth: 420,
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
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: "#168b0b" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            name="password"
            label="Contraseña"
            value={credentials.password}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#168b0b" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#168b0b" }} />
                    ) : (
                      <Visibility sx={{ color: "#168b0b" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Captcha onSelect={setSelectedIcon} />

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#03b12fcc",
              color: "white",
              fontSize: "1em",
              fontWeight: "bold",
              borderRadius: 1,
              mt: 2,
              transition: "background-color 0.3s ease",
              "&:hover": { bgcolor: "#333" },
            }}
            fullWidth
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
