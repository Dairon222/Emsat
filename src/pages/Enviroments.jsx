/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Typography, Button, Box, Snackbar, Alert } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";
import CreateElementsComponent from "../components/CreateElementsComponent";
import api from "../api/axios"

const columns = [
  { field: "nombre_ambiente", headerName: "Nombre", align: "center" },
  { field: "codigo", headerName: "Codigo", align: "center" },
];

const Enviroments = () => {
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

  // Crear un nuevo ambiente
  const handleCreate = async (newData) => {
    try {
      const response = await api.post("ambiente", newData); // Endpoint dinámico para ambientes
      showSnackbar("Ambiente creado exitosamente.", "success");

      // Forzar recarga de la tabla tras crear el ambiente
      setReloadTable((prev) => !prev);
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al crear el ambiente:", error);
      showSnackbar("Hubo un problema al crear el ambiente.", "error");
    }
  };

  return (
    <>
      <HeaderComponent title="Ambientes" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Botón para abrir el modal */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Ambientes de la sede.
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
            Crear ambiente
          </Button>
        </Box>

        {/* Tabla con datos de los ammbientes */}
        <TableComponent
          columns={columns}
          fetchData="ambiente" // Endpoint relativo para obtener ambientes
          title="Lista de ambientes"
          noDataMessage="No se encontraron ambientes."
          onReload={reloadTable} // Recarga los datos cuando cambia el estado
        />
      </Container>

      {/* Modal para crear nuevos ambientes */}
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Crear ambiente"
        columns={columns}
        endpoint="ambiente" // Endpoint dinámico para la creación
        onSuccess={() => {
          showSnackbar("Ambiente creado exitosamente.", "success");
          setReloadTable((prev) => !prev); // Recargar la tabla
        }}
        onError={() => {
          showSnackbar("Hubo un problema el ambiente.", "error");
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

export default Enviroments;
