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
  { field: "id", headerName: "Id rol", align: "center", hidden: true },
  { field: "tipo", headerName: "Tipo de rol", align: "center" },
];

const Roles = () => {
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
      
      await api.put(`rol/${updatedData.id}`, updatedData);
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
      <HeaderComponent title="Roles" />
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
            Roles del centro Sena.
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
            Crear rol
          </Button>
        </Box>

        <TableComponent
          columns={columns}
          fetchData="rol"
          title="Lista de roles"
          noDataMessage="No se encontraron roles."
          onReload={reloadTable}
          endpoint="rol"
          keyField="id"
          deleteMessage="Desea eliminar el rol de tipo "
          nameDelete="tipo"
          onDelete={handleDeleteSelection}
          onSave={handleSaveEdit} 
          hiddenFields={["id"]} 
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => toggleModal(setOpenModal, false)}
        title="Crear rol"
        columns={columns}
        endpoint="rol"
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "Rol creado exitosamente.",
            severity: "success",
          });
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          setSnackbar({
            open: true,
            message: "Error al crear el rol.",
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

export default Roles;
