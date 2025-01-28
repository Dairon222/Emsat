/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Typography, Button, Box, Snackbar, Alert } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";
import CreateElementsComponent from "../components/CreateElementsComponent";
import axios from "axios";

const columns = [
  { field: "nombre", headerName: "Nombre", align: "center" },
  { field: "apellido", headerName: "Apellido", align: "center" },
  { field: "identificacion", headerName: "Identificación", align: "center" },
  { field: "celular", headerName: "Celular", align: "center" },
  { field: "rol_id", headerName: "Rol ID", align: "center" },
  { field: "ficha_id", headerName: "Ficha ID", align: "center" },
];

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reloadTable, setReloadTable] = useState(false); // Estado para forzar la recarga de datos
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Función para mostrar el Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // Función para cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  // Función para crear un nuevo usuario
  const handleCreate = async (newData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/usuario", // Endpoint para crear usuarios
        newData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Mostrar Snackbar de éxito
      showSnackbar("Usuario creado exitosamente.", "success");

      console.log("Usuario creado:", response.data);

      // Recargar la tabla
      setReloadTable((prev) => !prev); // Cambia el estado de recarga
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al crear el usuario:", error);

      // Mostrar Snackbar de error
      showSnackbar("Hubo un problema al crear el usuario.", "error");
    }
  };

  return (
    <>
      <HeaderComponent title="Usuarios" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Título y botón para abrir el modal */}
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

        {/* Tabla que muestra los usuarios desde la API */}
        <TableComponent
          columns={columns}
          fetchData="http://127.0.0.1:8000/api/usuario" // URL para obtener usuarios
          title="Lista de Usuarios"
          noDataMessage="No se encontraron usuarios."
          onReload={reloadTable} // Se actualiza cada vez que cambie el estado reloadTable
        />
      </Container>

      {/* Modal para crear usuarios */}
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Crear Usuario"
        columns={columns}
        endpoint="http://127.0.0.1:8000/api/usuario" // Endpoint dinámico
        onSuccess={(data) => {
          console.log("Usuario creado:", data);
          showSnackbar("Usuario creado exitosamente.", "success");
          setReloadTable((prev) => !prev); // Fuerza la recarga de la tabla
        }}
        onError={(err) => {
          console.error("Error al crear usuario:", err);
          showSnackbar("Hubo un problema al crear el usuario.", "error");
        }}
      />

      {/* Snackbar para mensajes de retroalimentación */}
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
