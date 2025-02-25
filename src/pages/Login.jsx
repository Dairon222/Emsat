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

  const handleSelectSede = (event) => {
    const sedeSeleccionada = event.target.value;
    setSelectedSede(sedeSeleccionada);
    const sedeData = sedes.find((s) => s.nombre_sede === sedeSeleccionada);
    if (sedeData) {
      setSelectedNumeroSede(sedeData.numero_sede);
    }
  };
  const { login } = useSede(); // Importar la función login

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password || !selectedSede) {
      showSnackbar("Por favor completa todos los campos.", "warning");
      return;
    }

    try {
      const response = await api.post("login-sede", {
        username,
        contrasena: password,
        nombre_sede: selectedSede,
      });

      console.log("Respuesta del servidor:", response.data);

      const userData = response?.data?.user;
      const token = response?.data?.token;

      if (userData && userData.id && token) {
        login(token, userData.nombre_sede || selectedSede); // Guardar en el contexto
        navigate(userData.id === 4 ? "/users" : "/dashboard");
        showSnackbar("Inicio de sesión exitoso.", "success");
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
        </Box>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="sede-label">Selecciona la sede</InputLabel>
          <Select
            labelId="sede-label"
            id="nombre_sede"
            value={selectedSede}
            onChange={handleSelectSede}
            required
            MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            sx={{
              borderRadius: "5px",
              boxShadow: "0 0 4px rgba(20, 159, 34, 0.5)",
              ".MuiSelect-select": { textAlign: "left" },
            }}
          >
            {sedes.length > 0 ? (
              sedes.map((sede) => (
                <MenuItem key={sede.id} value={sede.nombre_sede}>
                  {sede.nombre_sede}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Cargando sedes...</MenuItem>
            )}
          </Select>
        </FormControl>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            id="username"
            label="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              mb: 3,
              borderRadius: "5px",
              boxShadow: "0 0 4px rgba(20, 159, 34, 0.5)",
            }}
          />
          <TextField
            fullWidth
            type="password"
            id="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              mb: 3,
              borderRadius: "5px",
              boxShadow: "0 0 4px rgba(20, 159, 34, 0.5)",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
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
          >
            Iniciar Sesión
          </Button>
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
    </Box>
  );
};

export default Login;
