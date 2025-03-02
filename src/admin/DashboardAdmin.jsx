/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import CreateElementsComponent from "../components/ModalCreateComponent";
// Iconos
import PeopleIcon from "@mui/icons-material/People";
import BlindsClosedIcon from '@mui/icons-material/BlindsClosed';
// Configuración de entidades y sus columnas
const entityConfig = {
  Sede: {
    title: "Sede",
    endpoint: "sede",
    description: "Crea una nueva sede en el centro Sena",
    icon: <BlindsClosedIcon />,
    columns: [
        { field: "id", headerName: "Id sede", align: "center", hidden: true },
        { field: "nombre_sede", headerName: "Nombre sede", align: "center" },
        { field: "numero_sede", headerName: "Número de la sede", align: "center" },
    ],
  },
  UsuarioSede: {
    title: "Usuario de la sede",
    endpoint: "register-sede",
    description: "Nuevo usuario que administre la sede",
    icon: <PeopleIcon />,
    columns: [
        { field: "id", headerName: "Id sede", align: "center", hidden: true },
        { field: "nombre_sede", headerName: "Nombre sede", align: "center" },
        { field: "numero_sede", headerName: "Número de la sede", align: "center" },
    ],
  },
};

const DashboardAdmin = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleOpenModal = (entity) => {
    setSelectedEntity(entityConfig[entity]);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEntity(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  return (
    <>
      <HeaderComponent title="Inicio" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box
          sx={{
            mb: 3,
            size: "large",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Panel de Control
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", fontStyle: "italic", maxWidth: 600 }}
          >
            Bienvenido al panel de control del software de gestión de ambientes
            y herramientas, aqui podras empezar a crear nuevos elementos del
            sistema.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {Object.keys(entityConfig).map((key) => {
            const entity = entityConfig[key];
            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <CardComponent
                  title={entity.title}
                  description={entity.description}
                  icon={entity.icon}
                  onCreate={() => handleOpenModal(key)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Modal reutilizable para crear elementos */}
      {selectedEntity && (
        <CreateElementsComponent
          open={openModal}
          onClose={handleCloseModal}
          title={`Crear ${selectedEntity.title}`}
          columns={selectedEntity.columns}
          endpoint={selectedEntity.endpoint}
          onSuccess={() => {
            showSnackbar(
              `${selectedEntity.title} creado exitosamente.`,
              "success"
            );
            setReloadTable((prev) => !prev);
          }}
          onError={() => {
            showSnackbar(
              `Hubo un problema al crear ${selectedEntity.title}.`,
              "error"
            );
          }}
        />
      )}

      {/* Snackbar para notificaciones */}
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

export default DashboardAdmin;
