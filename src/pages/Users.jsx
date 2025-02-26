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
import CreateElementsComponent from "../components/ModalCreateComponent";
import ModalDeleteComponent from "../components/ModalDeleteComponent";
import api from "../api/axios";

const columns = [
  { field: "id", headerName: "Id user", align: "center", hidden: true },
  { field: "nombre", headerName: "Nombre", align: "center" },
  { field: "apellido", headerName: "Apellido", align: "center" },
  { field: "identificacion", headerName: "Identificación", align: "center" },
  { field: "celular", headerName: "Celular", align: "center" },
  { field: "rol_id", headerName: "Id rol", align: "center"},
  { field: "ficha_id", headerName: "Id ficha", align: "center" },
];

const Users = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Función para manejar la actualización de datos del usuario
  const handleSaveEdit = async (updatedData) => {
    try {
      await api.put(`usuario/${updatedData.id}`, updatedData);
      setSnackbar({
        open: true,
        message: "Datos actualizados correctamente.",
        severity: "success",
      });
      setReloadTable((prev) => !prev); // Recargar la tabla
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al actualizar los datos del usuario.",
        severity: "error",
      });
    }
  };

  // Controla la apertura y cierre de modales
  const toggleModal = (modalSetter, value) => modalSetter(value);
  const handleDeleteSelection = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <HeaderComponent title="Usuarios" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
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
            onClick={() => toggleModal(setOpenModal, true)}
          >
            Crear usuario
          </Button>
        </Box>

        <TableComponent
          columns={columns}
          fetchData="usuario"
          title="Lista de usuarios"
          noDataMessage="No se encontraron usuarios."
          onReload={reloadTable}
          endpoint="usuario"
          keyField="id"
          deleteMessage="Desea eliminar al usuario con identificacion"
          onDelete={handleDeleteSelection}
          onSave={handleSaveEdit}
          nameDelete="identificacion"
          hiddenFields={[
            "id",
            "created_at",
            "updated_at",
            "ficha",
            "rol"
          ]} // Campos que no se mostrarán
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => toggleModal(setOpenModal, false)}
        title="Crear Usuario"
        columns={columns}
        endpoint="usuario"
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "Usuario creado exitosamente.",
            severity: "success",
          });
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          setSnackbar({
            open: true,
            message: "Error al crear el usuario.",
            severity: "error",
          });
        }}
      />
      
      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={() => toggleModal(setOpenDeleteModal, false)}
        item={selectedUser}
        onSuccess={() => setReloadTable((prev) => !prev)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default Users;
