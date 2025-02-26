/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import api from "../api/axios";

const ModalDeleteComponent = ({
  open,
  onClose,
  item,
  endpoint,
  keyField,
  deleteMessage,
  onSuccess,
  nameDelete,
}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const itemName = item ?.[nameDelete] || item?.[keyField] || "Elemento";


  const handleDelete = async () => {
    // Extraer el valor de keyField para la eliminación
    const itemKey = item[keyField];
    if (!itemKey) {
      setSnackbar({
        open: true,
        message: `No se encontró el campo '${keyField}' en el elemento.`,
        severity: "error",
      });
      return;
    }

    try {
      await api.delete(`${endpoint}/${itemKey}`);
      setSnackbar({
        open: true,
        message: "Elemento eliminado correctamente.",
        severity: "success",
      });
      onSuccess(); // Recargar datos
      onClose(); // Cerrar modal
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Error al eliminar el elemento.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

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
              ¿{deleteMessage} <b>{itemName}</b>?
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalDeleteComponent;
