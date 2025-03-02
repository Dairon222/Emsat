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
    { field: "nombre_sede", headerName: "Nombre sede", align: "center" },
    { field: "numero_sede", headerName: "Número de la sede", align: "center" },
];

const InfoSedesAdmin = () => {
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
      
      await api.put(`sede/${updatedData.id}`, updatedData);
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
      <HeaderComponent title="Sedes" />
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
            Sedes del centro Sena.
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
            Crear sede
          </Button>
        </Box>

        <TableComponent
          columns={columns}
          fetchData="sede"
          title="Lista de sedes"
          noDataMessage="No se encontraron sedes."
          onReload={reloadTable}
          endpoint="sede"
          keyField="id"
          deleteMessage="Desea eliminar la sede "
          nameDelete="nombre_sede"
          onDelete={handleDeleteSelection}
          onSave={handleSaveEdit} 
          hiddenFields={["id"]} 
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => toggleModal(setOpenModal, false)}
        title="Crear sede"
        columns={columns}
        endpoint="sede"
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "Sede creada exitosamente.",
            severity: "success",
          });
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          setSnackbar({
            open: true,
            message: "Error al crear la sede.",
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

export default InfoSedesAdmin;
