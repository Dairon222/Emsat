// eslint-disable-next-line no-unused-vars
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

const columns = [
  { field: "nombre", headerName: "Nombre", align: "center" },
  { field: "apellido", headerName: "Apellido", align: "center" },
  { field: "identificacion", headerName: "Identificación", align: "center" },
  { field: "celular", headerName: "Celular", align: "center" },
  {
    field: "rol_id",
    headerName: "Rol",
    align: "center",
    renderCell: (params) => {
      const { tipo } = params.row.rol;
      return tipo;
    },
  },
  {
    field: "ficha_id",
    headerName: "Ficha",
    align: "center",
    renderCell: (params) => {
      const { nombre_ficha } = params.row.ficha;
      return nombre_ficha;
    },
  },
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
          onDelete={handleOpenDeleteModal}
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
        keyField="identificacion"
        deleteMessage="¿Desea eliminar al usuario con identificación"
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
