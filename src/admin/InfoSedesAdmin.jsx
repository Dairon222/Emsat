/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableSedeAdmin from "../components/TableSedeAdmin";
import CreateElementsComponent from "../components/ModalCreateComponent";
import api from "../api/axios";
import ToggleSedeButton from "../components/ActiveSede";

const InfoSedesAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleToggleSede = async (sedeId, newState) => {
    // Mostrar el mensaje antes de la petición
    setSnackbar({
      open: true,
      message: `Sede ${newState ? "activada" : "desactivada"} correctamente.`,
      severity: "success",
    });

    try {
      await api.put(`sede/${sedeId}`, { estado: newState });

      // Recargar la tabla después de la actualización
      setReloadTable((prev) => !prev);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al actualizar el estado de la sede.",
        severity: "error",
      });
    }
  };

  const columns = [
    { field: "id", headerName: "Id sede", align: "center", hidden: true },
    { field: "nombre_sede", headerName: "Nombre sede", align: "center" },
    { field: "numero_sede", headerName: "Número de la sede", align: "center" },
    {
      field: "estado",
      headerName: "Estado de la sede",
      align: "center",
      renderCell: (row) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ToggleSedeButton
            sedeId={row.id}
            initialActive={row.estado}
            onToggle={handleToggleSede}
          />
        </Box>
      ),
    },
  ];

  const columnsModal = [
    { field: "id", headerName: "Id sede", align: "center", hidden: true },
    { field: "nombre_sede", headerName: "Nombre sede", align: "center" },
    { field: "numero_sede", headerName: "Número de la sede", align: "center" },
    {
      field: "estado",
      headerName: "Estado de la sede",
      align: "center",
      hidden: true,
    },
  ];

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
            onClick={() => setOpenModal(true)}
          >
            Crear sede
          </Button>
        </Box>

        <TableSedeAdmin
          columns={columns}
          fetchData="sede"
          title="Lista de sedes"
          noDataMessage="No se encontraron sedes."
          onReload={reloadTable}
          endpoint="sede"
          keyField="id"
          hiddenFields={["id", "estado"]}
        />
      </Container>

      <CreateElementsComponent
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Crear sede"
        columns={columnsModal}
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
