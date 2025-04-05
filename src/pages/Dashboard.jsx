/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSede } from "../context/SedeContext";
import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import CreateElementsComponent from "../components/ModalCreateComponent";
import api from "../api/axios";
// Iconos
import PeopleIcon from "@mui/icons-material/People";

import ManIcon from "@mui/icons-material/Man";
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AssignmentIcon from "@mui/icons-material/Assignment";

// Configuración de entidades y sus columnas
const entityConfig = {
  herramienta: {
    title: "Herramienta",
    endpoint: "herramienta",
    description: "Nueva herramienta",
    icon: <BuildIcon />,
    columns: [
      {
        field: "id",
        headerName: "Id herramienta",
        align: "center",
        hidden: true,
      },
      {
        field: "nombre_herramienta",
        headerName: "Herramienta",
        align: "center",
      },
      { field: "codigo", headerName: "Código", align: "center" },
      { field: "ubicacion", headerName: "Ubicación", align: "center" },
      {
        field: "estado_herramienta",
        headerName: "Estado de la herramienta",
        align: "center",
        type: "select",
        valueOptions: ["Bueno", "Regular", "Malo"],
      },
      {
        field: "detalle_herramienta",
        headerName: "Detalle de la herramienta",
        align: "center",
        type: "text",
      },

      { field: "stock", headerName: "Total", align: "center" },
    ],
  },
  usuario: {
    title: "Usuario",
    endpoint: "usuario",
    description: "Nuevo usuario",
    icon: <PeopleIcon />,
    columns: [
      { field: "id", headerName: "Id user", align: "center", hidden: true },
      { field: "nombre", headerName: "Nombre", align: "center" },
      { field: "apellido", headerName: "Apellido", align: "center" },
      {
        field: "identificacion",
        headerName: "Identificación",
        align: "center",
      },
      { field: "celular", headerName: "Celular", align: "center" },
      {
        field: "rol_id",
        headerName: "Id rol",
        align: "center",
        type: "select",
      },
      {
        field: "ficha_id",
        headerName: "Id ficha",
        align: "center",
        type: "select",
      },
    ],
  },
  prestamo: {
    title: "Préstamo",
    endpoint: "prestamo",
    description: "Nuevo préstamo",
    icon: <AssignmentIcon />,
    columns: [
      {
        field: "identificacion",
        headerName: "Identificación usuario",
        align: "center",
      },

      {
        field: "herramienta_id",
        headerName: "Herramienta",
        align: "center",
      },

      { field: "cantidad", headerName: "Cantidad", align: "center" },

      { field: "observaciones", headerName: "Observaciones", align: "center" },
    ],
  },

  ficha: {
    title: "Ficha",
    endpoint: "ficha",
    description: "Nueva ficha",
    icon: <SchoolIcon />,
    columns: [
      {
        field: "nombre_ficha",
        headerName: "Programa de formación",
        align: "center",
      },
      {
        field: "numero_ficha",
        headerName: "Número de la ficha",
        align: "center",
      },
    ],
  },
  ambiente: {
    title: "Ambiente",
    endpoint: "ambiente",
    description: "Nuevo ambiente",
    icon: <MeetingRoomIcon />,
    columns: [
      {
        field: "nombre_ambiente",
        headerName: "Nombre del ambiente",
        align: "center",
      },
      { field: "codigo", headerName: "Codigo del ambiente", align: "center" },
    ],
  },
  rol: {
    title: "Rol",
    endpoint: "rol",
    description: "Nuevo rol",
    icon: <ManIcon />,
    columns: [{ field: "tipo", headerName: "Tipo de rol", align: "center" }],
  },
};

const Dashboard = () => {
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

export default Dashboard;
