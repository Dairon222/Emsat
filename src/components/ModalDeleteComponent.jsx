/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import api from "../api/axios";

const ModalDeleteComponent = ({ open, onClose, item, endpoint, onSuccess }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const handleDelete = async () => {
    if (!item || !endpoint) return;

    try {
      await api.delete(`${endpoint}/${item.id}`); // DELETE con el ID del elemento
      setSnackbar({ open: true, message: "Elemento eliminado correctamente.", severity: "success" });
      onSuccess(); // Refrescar los datos en la tabla
      onClose(); // Cerrar modal
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
      setSnackbar({ open: true, message: "Error al eliminar el elemento.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ open: false, message: "", severity: "" });

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirmar Eliminación
          </Typography>
          {item && (
            <Typography>
              ¿Realmente desea eliminar <b>{item.nombre || `ID: ${item.id}`}</b>?
            </Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar para mostrar mensajes de éxito/error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalDeleteComponent;
