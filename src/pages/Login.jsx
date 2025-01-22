// Login.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import senaLogo from "../assets/logo_sena.png";

const Login = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUser && password) {
      console.log("Usuario:", selectedUser);
      console.log("Contraseña:", password);
      navigate("/dashboard");
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const sedeOptions = [
    "Rionegro",
    "Sonsón",
    "La Ceja",
    // "El Carmen de Viboral",
    // "El Retiro",
    // "Guarne",
    // "Guatapé",
  ];

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
            <InputLabel id="sede-label" sx={{ textAlign: "left" }}>
              Selecciona la sede
            </InputLabel>
            <Select
              labelId="sede-label"
              id="sede"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
              MenuProps={{
                PaperProps: {
                  sx: { maxHeight: 200 },
                },
              }}
              sx={{
                borderRadius: "5px",
                ".MuiSelect-select": {
                  textAlign: "left",
                },
              }}
            >
              {sedeOptions.map((sede) => (
                <MenuItem key={sede} value={sede}>
                  {sede}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="password"
            id="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la contraseña"
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
            "a:hover": {
              color: "rgba(197, 36, 36, 0.811)",
            },
          }}
        >
          <a href="/recuperar-contraseña">¿Olvidaste tu contraseña?</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
