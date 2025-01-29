/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";
import CreateElementsComponent from "../components/CreateElementsComponent";
import ModalDeleteComponent from "../components/ModalDeleteComponent";
import api from "../api/axios";

const columns = [
  { field: "nombre", headerName: "Nombre", align: "center" },
  { field: "apellido", headerName: "Apellido", align: "center" },
  { field: "identificacion", headerName: "Identificación", align: "center" },
  { field: "celular", headerName: "Celular", align: "center" },
  { field: "rol_id", headerName: "Rol ID", align: "center" },
  { field: "ficha_id", headerName: "Ficha ID", align: "center" },
];

const Users = () => {
  const [openModal, setOpenModal] = useState(false); // Controla el modal de creación
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Controla el modal de eliminación
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para eliminar
  const [reloadTable, setReloadTable] = useState(false); // Para actualizar la tabla después de cambios
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Funciones para abrir y cerrar modales
  const handleOpenCreateModal = () => setOpenModal(true);
  const handleCloseCreateModal = () => setOpenModal(false);
  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setSelectedUser(null);
    setOpenDeleteModal(false);
  };

  // Mostrar notificaciones
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };
  const handleCloseSnackbar = () =>
    setSnackbar({ open: false, message: "", severity: "" });

  // Crear usuario en la API
  const handleCreate = async (newData) => {
    try {
      await api.post("usuario", newData);
      showSnackbar("Usuario creado exitosamente.", "success");
      setReloadTable((prev) => !prev); // Recargar la tabla
      handleCloseCreateModal();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      showSnackbar("Error al crear el usuario.", "error");
    }
  };

  // Eliminar usuario en la API
  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await api.delete(`usuario/${selectedUser.id}`);
      showSnackbar("Usuario eliminado exitosamente.", "success");
      setReloadTable((prev) => !prev); // Recargar la tabla tras eliminar
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      showSnackbar("Error al eliminar el usuario.", "error");
    }
  };

  return (
    <>
      <HeaderComponent title="Usuarios" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Botón para abrir el modal de creación */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
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
            onClick={handleOpenCreateModal}
          >
            Crear usuario
          </Button>
        </Box>

        <TableComponent
          columns={columns}
          fetchData="usuario"
          title="Lista de Usuarios"
          noDataMessage="No se encontraron usuarios."
          onReload={reloadTable}
          endpoint="usuario"
          onDelete={handleOpenDeleteModal} // Se pasa la función de eliminación
        />
      </Container>

      {/* Modal para crear un nuevo usuario */}
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseCreateModal}
        title="Crear Usuario"
        columns={columns}
        endpoint="usuario"
        onSuccess={() => {
          showSnackbar("Usuario creado exitosamente.", "success");
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          showSnackbar("Error al crear el usuario.", "error");
        }}
      />

      {/* Modal para eliminar usuario */}
      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        item={selectedUser}
        endpoint="usuario"
        onSuccess={() => {
          showSnackbar("Usuario eliminado exitosamente.", "success");
          setReloadTable((prev) => !prev);
        }}
      />

      {/* Snackbar para mensajes de éxito o error */}
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
