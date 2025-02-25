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
  { field: "nombre_ambiente", headerName: "Nombre", align: "center" },
  { field: "codigo", headerName: "Codigo", align: "center" },
  { field: "disponible", headerName: "Disponibilidad", align: "center", hidden:true },
];

const Enviroments = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedEnviroment, setSelectedEnviroment] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Función para manejar la actualización de datos de los ambientes
  const handleSaveEdit = async (updatedData) => {
    try {
      await api.put(`ambiente/${updatedData.id}`, updatedData);
      setSnackbar({
        open: true,
        message: "Datos actualizados correctamente.",
        severity: "success",
      });
      setReloadTable((prev) => !prev); // Recargar la tabla
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
      });
    }
  };

  // Controla la apertura y cierre de modales
  const toggleModal = (modalSetter, value) => modalSetter(value);
  const handleDeleteSelection = (enviroment) => {
    setSelectedEnviroment(enviroment);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <HeaderComponent title="Ambientes" />
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
            Administra los ambientes de la sede.
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
            Crear ambiente
          </Button>
        </Box>

        <TableComponent
          columns={columns}
          fetchData="ambiente"
          title="Lista de ambientes"
          noDataMessage="No se encontraron ambientes."
          onReload={reloadTable}
          endpoint="ambiente"
          keyField="id"
          deleteMessage="Desea eliminar el ambiente #  "
          onDelete={handleDeleteSelection}
          onSave={handleSaveEdit}
          hiddenFields={["id","disponible"]}
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => toggleModal(setOpenModal, false)}
        title="Crear ambiente"
        columns={columns}
        endpoint="ambiente"
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "Ambiente creado exitosamente.",
            severity: "success",
          });
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          setSnackbar({
            open: true,
            message: "Error al crear el ambiente.",
            severity: "error",
          });
        }}
      />

      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={() => toggleModal(setOpenDeleteModal, false)}
        item={selectedEnviroment}
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

export default Enviroments;
