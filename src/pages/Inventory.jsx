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
  { field: "id", headerName: "Id herramienta", align: "center", hidden: true },
  { field: "nombre_herramienta", headerName: "Herramienta", align: "center" },
  { field: "codigo", headerName: "Código", align: "center" },
  { field: "ubicacion", headerName: "Ubicación", align: "center" },
  {
    field: "estado_herramienta",
    headerName: "Estado de la herramienta",
    align: "center",
    type: "select",
    valueOptions: ["Bueno", "Regular", "Malo"],

    renderCell: (row) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            color: "inherit",
            backgroundColor:
              row.estado_herramienta === "Bueno"
                ? "green"
                : row.estado_herramienta === "Regular"
                ? "#f07520"
                : "red",
          }}
        />
        {row.estado_herramienta}
      </Box>
    ),
  },
  {
    field: "detalle_herramienta",
    headerName: "Detalle de la herramienta",
    align: "center",
    type: "text",
    renderCell: (row) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            maxWidth: "200px",
            justifyContent: "center",
          }}
        >
          {row.detalle_herramienta || "En buen estado"}
        </Box>
      </Box>
    ),
  },

  { field: "stock", headerName: "Total", align: "center" },
];

const Inventory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSaveEdit = async (updatedData) => {
    try {
      await api.put(`herramienta/${updatedData.id}`, updatedData);
      setSnackbar({
        open: true,
        message: "Datos actualizados correctamente.",
        severity: "success",
      });
      setReloadTable((prev) => !prev);
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
      });
    }
  };

  const toggleModal = (modalSetter, value) => modalSetter(value);
  const handleDeleteSelection = (tool) => {
    setSelectedTool(tool);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <HeaderComponent title="Herramientas" />
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
            Administra las herramientas y elementos del sistema y la sede.
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
            Crear herramienta
          </Button>
        </Box>

        <TableComponent
          columns={columns}
          fetchData="herramienta"
          title="Lista de herramientas"
          noDataMessage="No se encontraron herramientas."
          onReload={reloadTable}
          endpoint="herramienta"
          keyField="id"
          deleteMessage="Desea eliminar la herramienta con código"
          nameDelete="codigo"
          onDelete={handleDeleteSelection}
          onSave={handleSaveEdit}
          hiddenFields={["id", "usuariosede_id", "created_at", "updated_at"]}
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => toggleModal(setOpenModal, false)}
        title="Crear herramienta"
        columns={columns}
        endpoint="herramienta"
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: "Herramienta creada exitosamente.",
            severity: "success",
          });
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          setSnackbar({
            open: true,
            message: "Error al crear la herramienta.",
            severity: "error",
          });
        }}
      />

      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={() => toggleModal(setOpenDeleteModal, false)}
        item={selectedTool}
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

export default Inventory;
