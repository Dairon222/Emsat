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
  { field: "nombre_ficha", headerName: "Ficha", align: "center" },
  { field: "numero_ficha", headerName: "Número", align: "center" },
];

const Fichas = () => {
  const [openModal, setOpenModal] = useState(false); // Controla la apertura del modal
  const [reloadTable, setReloadTable] = useState(false); // Controla la recarga de la tabla
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  }); // Estado para Snackbar

  // Abrir y cerrar el modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Mostrar mensajes en Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  // Crear una nueva ficha
  const handleCreate = async (newData) => {
    try {
      const response = await api.post("ficha", newData); // Endpoint dinámico para fichas
      showSnackbar("Ficha creada exitosamente.", "success");

      // Forzar recarga de la tabla tras crear la ficha
      setReloadTable((prev) => !prev);
      handleCloseModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al crear la ficha:", error);
      showSnackbar("Hubo un problema al crear la ficha.", "error");
    }
  };

  return (
    <>
      <HeaderComponent title="Fichas" />
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
            Fichas de la sede.
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
            Crear ficha
          </Button>
        </Box>

        {/* Tabla con datos de las fichas */}
        <TableComponent
          columns={columns}
          fetchData="ficha" // Endpoint relativo para obtener fichas
          title="Lista de fichas"
          noDataMessage="No se encontraron fichas."
          onReload={reloadTable} // Recarga los datos cuando cambia el estado
        />
      </Container>

      {/* Modal para crear nuevas fichas */}
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Crear ficha"
        columns={columns}
        endpoint="ficha" // Endpoint dinámico para la creación
        onSuccess={() => {
          showSnackbar("Ficha creada exitosamente.", "success");
          setReloadTable((prev) => !prev); // Recargar la tabla
        }}
        onError={() => {
          showSnackbar("Hubo un problema al crear la ficha.", "error");
        }}
      />
      {/* Modal para eliminar usuario */}
      <ModalDeleteComponent
        open={openModal}
        onClose={handleCloseModal}
        endpoint="usuario"
        keyField="numero_ficha"
        deleteMessage="¿Desea eliminar la ficha "
        onSuccess={() => {
          showSnackbar("Ficha eliminada exitosamente.", "success");
          setReloadTable((prev) => !prev);
        }}
        onError={() => {
          showSnackbar("Error al eliminar la ficha.", "error");
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

export default Fichas;
