/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Typography, Button, Box, Snackbar, Alert } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";
import CreateElementsComponent from "../components/CreateElementsComponent";
import api from "../api/axios"

const columns = [
  { field: "nombre", headerName: "Nombre", align: "center" },
  { field: "apellido", headerName: "Apellido", align: "center" },
  { field: "identificacion", headerName: "Identificación", align: "center" },
  { field: "celular", headerName: "Celular", align: "center" },
  { field: "rol_id", headerName: "Rol ID", align: "center" },
  { field: "ficha_id", headerName: "Ficha ID", align: "center" },
];

const Users = () => {
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

  // Crear un nuevo usuario
  const handleCreate = async (newData) => {
    try {
      const response = await api.post("usuario", newData); // Endpoint dinámico para usuarios
      showSnackbar("Usuario creado exitosamente.", "success");

      // Forzar recarga de la tabla tras crear el usuario
      setReloadTable((prev) => !prev);
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      showSnackbar("Hubo un problema al crear el usuario.", "error");
    }
  };

  return (
    <>
      <HeaderComponent title="Usuarios" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Botón para abrir el modal */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Administra los usuarios del sistema.
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
            Crear usuario
          </Button>
        </Box>

        {/* Tabla con datos de usuarios */}
        <TableComponent
          columns={columns}
          fetchData="usuario" // Endpoint relativo para obtener usuarios
          title="Lista de Usuarios"
          noDataMessage="No se encontraron usuarios."
          onReload={reloadTable} // Recarga los datos cuando cambia el estado
        />
      </Container>

      {/* Modal para crear nuevos usuarios */}
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Crear Usuario"
        columns={columns}
        endpoint="usuario" // Endpoint dinámico para la creación
        onSuccess={() => {
          showSnackbar("Usuario creado exitosamente.", "success");
          setReloadTable((prev) => !prev); // Recargar la tabla
        }}
        onError={() => {
          showSnackbar("Hubo un problema al crear el usuario.", "error");
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

export default Users;
