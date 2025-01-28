/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Typography, Button, Box, Snackbar, Alert } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";
import CreateElementsComponent from "../components/CreateElementsComponent";
import api from "../api/axios"

const columns = [
  { field: "nombre_herramienta", headerName: "Herramienta", align: "center" },
  { field: "codigo", headerName: "Código", align: "center" },
  { field: "stock", headerName: "Total", align: "center" },
  { field: "ubicacion", headerName: "Ubicación", align: "center" },
];

const Inventory = () => {
  const [openModal, setOpenModal] = useState(false); // Controla la apertura del modal
  const [reloadTable, setReloadTable] = useState(false); // Controla la recarga de la tabla
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" }); // Estado para Snackbar

  // Abrir y cerrar el modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Mostrar mensajes en Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  // Crear una nueva herramienta
  const handleCreate = async (newData) => {
    try {
      const response = await api.post("herramienta", newData); // Endpoint dinámico para herramientas
      showSnackbar("Herramienta creada exitosamente.", "success");

      // Forzar recarga de la tabla tras crear la herramienta
      setReloadTable((prev) => !prev);
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      showSnackbar("Hubo un problema al crear la herramienta.", "error");
    }
  };

  return (
    <>
      <HeaderComponent title="Herramientas" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Botón para abrir el modal */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Administra las herramientas del sistema.
          </Typography>
          <Button
            variant="contained"
            sx={{
              p: 1,
              transition: "all 0.5s ease",
              ":hover": { backgroundColor: "#2e7d32" },
            }}
            onClick={handleOpenModal}
          >
            Crear herramienta
          </Button>
        </Box>

        {/* Tabla con datos de las herramientas */}
        <TableComponent
          columns={columns}
          fetchData="herramienta" // Endpoint relativo para obtener herramientas
          title="Lista de herramientas"
          noDataMessage="No se encontraron herramientas."
          onReload={reloadTable} // Recarga los datos cuando cambia el estado
        />
      </Container>

      {/* Modal para crear nuevas herramientas */}
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Crear herramienta"
        columns={columns}
        endpoint="herramienta" // Endpoint dinámico para la creación
        onSuccess={() => {
          showSnackbar("Herramienta creada exitosamente.", "success");
          setReloadTable((prev) => !prev); // Recargar la tabla
        }}
        onError={() => {
          showSnackbar("Hubo un problema al crear la herramienta.", "error");
        }}
      />

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
    </>
  );
};

export default Inventory;
