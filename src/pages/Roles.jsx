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
  { field: "id", headerName: "Id rol", align: "center"},
  { field: "tipo", headerName: "Tipo", align: "center" },
];

const Roles = () => {
  const [openModal, setOpenModal] = useState(false); // Controla la apertura del modal

  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Controla el modal de eliminación
  const [selectedRol, setSelectedRol] = useState(null); // Ficha seleccionada para eliminar
  const [reloadTable, setReloadTable] = useState(false); // Controla la recarga de la tabla
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  }); // Estado para Snackbar

  // Abrir y cerrar el modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDeleteModal = (user) => {
    setSelectedRol(user);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setSelectedRol(null);
    setOpenDeleteModal(false);
  };

  // Mostrar mensajes en Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  // Crear un nuevo rol
  const handleCreate = async (newData) => {
    try {
      const response = await api.post("rol", newData); // Endpoint dinámico para roles
      showSnackbar("Rol creado exitosamente.", "success");

      // Forzar recarga de la tabla tras crear el rol
      setReloadTable((prev) => !prev);
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al crear el rol:", error);
      showSnackbar("Hubo un problema al crear el rol.", "error");
    }
  };

  return (
    <>
      <HeaderComponent title="Roles" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {/* Botón para abrir el modal */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="body1" gutterBottom>
            Roles del sistema.
          </Typography>
          <Button
            variant="contained"
            sx={{
              p: 1,
              transition: "all 0.5s ease",
              ":hover": { backgroundColor: "#2e7d32" },
            }}
            onClick={handleOpenModal}
          >
            Crear rol
          </Button>
        </Box>

        {/* Tabla con datos de los roles */}
        <TableComponent
          columns={columns}
          fetchData="rol" // Endpoint relativo para obtener roles
          title="Lista de roles"
          endpoint="rol"
          keyField="id"
          onDelete={handleOpenDeleteModal}
          deleteMessage="Desea eliminar el rol con id"
          noDataMessage="No se encontraron roles."
          onReload={reloadTable} // Recarga los datos cuando cambia el estado
        />
      </Container>

      {/* Modal para crear nuevos roles */}
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Crear rol"
        columns={columns}
        endpoint="rol" // Endpoint dinámico para la creación
        onSuccess={() => {
          showSnackbar("Rol creado exitosamente.", "success");
          setReloadTable((prev) => !prev); // Recargar la tabla
        }}
        onError={() => {
          showSnackbar("Hubo un problema al crear el rol.", "error");
        }}
      />

      {/* Modal para eliminar Ficha */}
      <ModalDeleteComponent
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        item={selectedRol}
        onSuccess={() => {
          setReloadTable((prev) => !prev);
        }}
      />

      {/* Snackbar para retroalimentación */}
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

export default Roles;
