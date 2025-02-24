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
  { field: "id", headerName: "Id ficha", align: "center" },
  { field: "nombre_ficha", headerName: "Ficha", align: "center" },
  { field: "numero_ficha", headerName: "Número", align: "center" },
];


const columnsModal = [
  { field: "id", headerName: "Id ficha", align: "center", hidden: true },
  { field: "nombre_ficha", headerName: "Ficha", align: "center" },
  { field: "numero_ficha", headerName: "Número", align: "center" },
];

const Fichas = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Función para manejar la actualización de datos del usuario
  const handleSaveEdit = async (updatedData) => {
    try {
      await api.put(`ficha/${updatedData.numero_ficha}`, updatedData);
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
  const handleDeleteSelection = (ficher) => {
    setSelectedFicha(ficher);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <HeaderComponent title="Fichas" />
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
            Administra las fichas del centro de Sena.
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
            Crear ficha
          </Button>
        </Box>

        <TableComponent
          columns={columns}
          fetchData="ficha"
          title="Lista de fichas"
          noDataMessage="No se encontraron fichas."
          onReload={reloadTable}
          endpoint="ficha"
          keyField="numero_ficha"
          deleteMessage="Desea eliminar la ficha con numero"
          onDelete={handleDeleteSelection}
          onSave={handleSaveEdit} // Pasamos la función onSave 
          hiddenFields={["id", "updated_at", "created_at"]} // Campos que no se mostrarán
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => toggleModal(setOpenModal, false)}
        title="Crear ficha"
        columns={columnsModal}
        endpoint="ficha"
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "ficha creado exitosamente.",
            severity: "success",
          });
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          setSnackbar({
            open: true,
            message: "Error al crear la ficha.",
            severity: "error",
          });
        }}
      />

      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={() => toggleModal(setOpenDeleteModal, false)}
        item={selectedFicha}
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

export default Fichas;
