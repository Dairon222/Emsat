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
  {
    field: "usuario_id",
    headerName: "Id usuario",
    align: "center",
    hidden: true,
  },
  { field: "id", headerName: "Id", align: "center", hidden: true },
  { field: "identificacion", headerName: "Identificación usuario", align: "center" },
  {
    field: "estado_prestamo",
    headerName: "Estado",
    align: "center",
    hidden: true,
  },
  {
    field: "herramienta_id",
    headerName: "Id herramienta",
    align: "center",
    hidden: true,
  },
  {
    field: "ambiente_id",
    headerName: "Id ambiente",
    align: "center",
    hidden: true,
  },
  {
    field: "codigo_herramienta",
    headerName: "Codigo herramienta",
    align: "center",
  },
  { field: "cantidad", headerName: "Cantidad", align: "center" },
  { field: "codigo_ambiente", headerName: "Codigo ambiente", align: "center", hidden:true },
  {
    field: "estado_prestamo",
    headerName: "Estado",
    align: "center",
    hidden: true,
  },
  { field: "observaciones", headerName: "Observaciones", align: "center" },
];

const Loans = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Función para manejar la actualización de datos de los préstamos
  const handleSaveEdit = async (updatedData) => {
    try {
      await api.put(`prestamo/${updatedData.id}`, updatedData);
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
  const handleDeleteSelection = (loan) => {
    setSelectedLoan(loan);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <HeaderComponent title="Préstamos" />
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
            Administra los prestamos de la sede.
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
            Crear préstamo
          </Button>
        </Box>

        <TableComponent
          columns={columns}
          fetchData="prestamo"
          title="Lista de prestamos"
          noDataMessage="No se encontraron prestamos activos."
          onReload={reloadTable}
          endpoint="prestamo"
          keyField="id"
          deleteMessage="Desea finalizar el prestamo de la herramienta con código"
          nameDelete="id"
          onDelete={handleDeleteSelection}
          onSave={handleSaveEdit}
          hiddenFields={[
            "id",
            "created_at",
            "updated_at",
            "usuario_id",
            "herramienta_id",
            "ambiente_id",
            "estado_prestamo",
          ]}
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => toggleModal(setOpenModal, false)}
        title="Crear prestamo"
        columns={columns}
        endpoint="prestamo"
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "Prestamo creada exitosamente.",
            severity: "success",
          });
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          setSnackbar({
            open: true,
            message: "Error al crear el prestamo.",
            severity: "error",
          });
        }}
      />

      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={() => toggleModal(setOpenDeleteModal, false)}
        item={selectedLoan}
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

export default Loans;
