/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../api/axios";
import senaLogo from "../assets/logo_sena.png";

const CreateFormsComponent = ({
  title,
  columns,
  endpoint,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [sedes, setSedes] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "" });

    try {
      const response = await api.post(endpoint, formData);
      setSnackbar({
        open: true,
        message: "Elemento creado exitosamente.",
        severity: "success",
      });

      if (onSuccess) onSuccess(response.data);
      setFormData({});
    } catch (error) {
      console.error("Error al crear el elemento:", error);
      setSnackbar({
        open: true,
        message: "Hubo un problema al crear el elemento. Inténtalo de nuevo.",
        severity: "error",
      });
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const res = await api.get("/sede");
        setSedes(res.data);
      } catch (err) {
        console.error("Error cargando sedes", err);
      }
    };

    fetchSedes();
  }, []);

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
        {/* LOGO */}
        <Box sx={{ mb: 3 }}>
          <img
            src={senaLogo}
            alt="Logo SENA"
            style={{ width: 80, height: "auto" }}
          />
        </Box>

        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ color: "black", fontWeight: "bold", mb: 3 }}
        >
          {title}
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {columns
            .filter((column) => !column.hidden)
            .map((column) => {
              if (column.type === "select") {
                return (
                  <FormControl
                    key={column.field}
                    fullWidth
                    size="small"
                    sx={{
                      display: "flex",
                      width: "100%",
                      borderRadius: "5px",
                      boxShadow: "0 0 4px rgba(20, 159, 34, 0.5)",
                      gap: "0.3rem",
                    }}
                  >
                    <InputLabel>{column.headerName}</InputLabel>
                    <Select
                      label={column.headerName}
                      name={column.field}
                      value={formData[column.field] || ""}
                      onChange={handleInputChange}
                      sx={{ textAlign: "left" }} // Alineación a la izquierda
                    >
                      {sedes.map((sede) => (
                        <MenuItem
                          key={sede.id}
                          value={sede.numero_sede}
                          sx={{ textAlign: "left" }} // También en los ítems
                        >
                          {sede.nombre_sede}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              if (column.field === "password") {
                return (
                  <TextField
                    key={column.field}
                    label={column.headerName}
                    name={column.field}
                    variant="outlined"
                    size="small"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={formData[column.field] || ""}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      borderRadius: "5px",
                      boxShadow: "0 0 4px rgba(20, 159, 34, 0.5)",
                      gap: "0.3rem",
                    }}
                  />
                );
              }

              return (
                <TextField
                  key={column.field}
                  label={column.headerName}
                  name={column.field}
                  variant="outlined"
                  size="small"
                  fullWidth
                  type={column.inputType || "text"} // Usa 'number' si se define
                  onChange={handleInputChange}
                  sx={{
                    borderRadius: "5px",
                    boxShadow: "0 0 4px rgba(20, 159, 34, 0.5)",
                    gap: "0.3rem",
                  }}
                />
              );
            })}

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              backgroundColor: "#03b12fcc",
              color: "white",
              fontSize: "1em",
              fontWeight: "bold",
              marginTop: "1rem",
              marginBottom: "1rem",
              padding: "8px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {loading ? "Creando..." : "Crear"}
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

export default CreateFormsComponent;
