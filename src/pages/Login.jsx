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
  const { updateSede } = useSede();
  const [sedes, setSedes] = useState([]);
  const [selectedSede, setSelectedSede] = useState("");
  const [selectedNumeroSede, setSelectedNumeroSede] = useState(null);
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  // Cargar sedes desde la API
  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await api.get("sede"); // La API debe devolver también el numero_sede
        setSedes(response.data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "No se pudieron cargar las sedes.",
          severity: "error",
        });
      }
    };
    fetchSedes();
  }, []);

  // Mostrar notificación
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

  // Manejar el cambio de selección de sede
  const handleSelectSede = (event) => {
    const sedeSeleccionada = event.target.value;
    setSelectedSede(sedeSeleccionada);

    // Buscar el número de sede correspondiente
    const sedeData = sedes.find((s) => s.nombre_sede === sedeSeleccionada);
    if (sedeData) {
      setSelectedNumeroSede(sedeData.numero_sede);
    }
  };

  // Manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!selectedSede || !password) {
      showSnackbar("Por favor completa todos los campos.", "warning");
      return;
    }

    try {
      const response = await api.post("login-sede", {
        username: selectedSede,
        contrasena: password,
      });

      console.log("API Response:", response.data); // 🔍 Ver qué responde la API

      const userData = response.data.user; // 🔹 Extraer correctamente el usuario

      if (userData?.id) {
        updateSede(userData.sede); // Guarda la sede en el contexto
        localStorage.setItem("userId", userData.id); // Guarda el ID del usuario

        // 🔹 Redirección basada en el ID del usuario
        if (userData.id === 4) {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }

        showSnackbar("Inicio de sesión exitoso.", "success");
      } else {
        throw new Error("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
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

        <Box component="form" onSubmit={handleLogin}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="sede-label">Selecciona la sede</InputLabel>
            <Select
              labelId="sede-label"
              id="username"
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
                    {sede.nombre_sede} (#{sede.numero_sede})
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Cargando sedes...</MenuItem>
              )}
            </Select>
          </FormControl>

          <TextField
            type="password"
            id="contrasena"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
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

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            a: {
              textDecoration: "none",
              color: "#333",
              fontSize: "0.9em",
              transition: "color 0.3s",
            },
            "a:hover": { color: "rgba(197, 36, 36, 0.811)" },
          }}
        >
          <a href="/recuperar-contraseña">¿Olvidaste tu contraseña?</a>
        </Typography>
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
