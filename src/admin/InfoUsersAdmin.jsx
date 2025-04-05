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
    { field: "id", headerName: "Id sede", align: "center", hidden: true },
    { field: "username", headerName: "Nombre usuario", align: "center" },
    { field: "email", headerName: "Email", align: "center" },
    { field: "sede.nombre_sede", headerName: "Sede", align: "center" },
];

const columnsModal = [
    { field: "id", headerName: "Id sede", align: "center", hidden: true },
    { field: "username", headerName: "Nombre usuario", align: "center" },
    { field: "email", headerName: "Email", align: "center" },
    {field: "numero_sede" , headerName: "Numero de la sede", align: "center"},
    { field: "password", headerName: "Contraseña", align: "center" },
];


const InfoUsersAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRol, setSelectedRol] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  
  const handleSaveEdit = async (updatedData) => {
    try {
      
      await api.put(`usuariosede/${updatedData.id}`, updatedData);
      setSnackbar({
        open: true,
        message: "Datos actualizados correctamente.",
        severity: "success",
      });
      setReloadTable((prev) => !prev); // Recargar la tabla
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al actualizar los datos.",
        severity: "error",
      });
    }
  };

  // Controla la apertura y cierre de modales
  const toggleModal = (modalSetter, value) => modalSetter(value);
  const handleDeleteSelection = (rol) => {
    setSelectedRol(rol);
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
            Usuarios de las sedes del centro Sena.
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
          fetchData="usuariosede"
          title="Lista de usuarios"
          noDataMessage="No se encontraron usuarios de las sedes."
          onReload={reloadTable}
          endpoint="usuariosede"
          keyField="id"
          deleteMessage="Desea eliminar el usuario "
          nameDelete="username"
          onDelete={handleDeleteSelection}
          onSave={handleSaveEdit} 
          hiddenFields={["id", "created_at", "updated_at", "sede_id", "sede"]} 
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => toggleModal(setOpenModal, false)}
        title="Crear usuario"
        columns={columnsModal}
        endpoint="register-sede"
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "Usuario de sede creado exitosamente.",
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
        item={selectedRol}
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

export default InfoUsersAdmin;
