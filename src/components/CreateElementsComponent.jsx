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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CreateElementsComponent = ({
  open,
  onClose,
  title,
  columns,
  endpoint, // Nueva prop para la URL dinámica
  onSuccess, // Callback para manejar éxito
  onError, // Callback para manejar errores
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (onSuccess) onSuccess(response.data); // Llama al callback en caso de éxito
      setFormData({});
      onClose();
    } catch (err) {
      console.error("Error al enviar los datos:", err);
      setError("Hubo un problema al crear el elemento.");
      if (onError) onError(err);
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
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
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
      </Box>
    </Modal>
  );
};

export default CreateElementsComponent;
