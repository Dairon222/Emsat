/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api/axios";

const CreateElementsComponent = ({
  open,
  onClose,
  title,
  columns,
  endpoint, // Recibe el endpoint dinámico como prop
  onSuccess, // Callback para manejar el éxito
  onError, // Callback para manejar errores
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el cierre del Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  // Maneja el envío del formulario
  const handleSubmit = async () => {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "" }); // Resetear el estado del Snackbar

    try {
      const response = await api.post(endpoint, formData); // Utiliza el endpoint dinámico
      setSnackbar({
        open: true,
        message: "Elemento creado exitosamente.",
        severity: "success",
      });

      if (onSuccess) onSuccess(response.data); // Llama al callback onSuccess
      setFormData({}); // Limpia el formulario
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al crear el elemento:", error);
      setSnackbar({
        open: true,
        message: "Hubo un problema al crear el elemento. Inténtalo de nuevo.",
        severity: "error",
      });

      if (onError) onError(error); // Llama al callback onError
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography id="modal-title" variant="h6">
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {columns.map((column) => (
            <TextField
              key={column.field}
              label={column.headerName}
              name={column.field}
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Creando..." : "Crear"}
          </Button>
        </Box>

        {/* Snackbar para retroalimentación */}
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
    </Modal>
  );
};

export default CreateElementsComponent;
