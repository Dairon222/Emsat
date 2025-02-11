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
import CreateElementsComponent from "../components/CreateElementsComponent";
import api from "../api/axios";

// Iconos
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import HandshakeIcon from "@mui/icons-material/Handshake";

// Configuración de entidades y sus columnas
const entityConfig = {
  usuario: {
    title: "Usuario",
    endpoint: "usuario",
    description: "Gestiona los usuarios del sistema",
    icon: <PeopleIcon />,
    columns: [
      { field: "nombre", headerName: "Nombre", align: "center" },
      { field: "apellido", headerName: "Apellido", align: "center" },
      { field: "identificacion", headerName: "Identificación", align: "center" },
      { field: "celular", headerName: "Celular", align: "center" },
      { field: "rol_id", headerName: "Rol ID", align: "center" },
      { field: "ficha_id", headerName: "Ficha ID", align: "center" },
    ],
  },
  ficha: {
    title: "Ficha",
    endpoint: "ficha",
    description: "Gestiona las fichas de formación",
    icon: <SchoolIcon />,
    columns: [
      { field: "nombre_ficha", headerName: "Nombre ficha", align: "center" },
      { field: "numero_ficha", headerName: "Número de ficha", align: "center" },
    ],
  },
  herramienta: {
    title: "Herramienta",
    endpoint: "herramienta",
    description: "Gestiona las herramientas disponibles",
    icon: <BuildIcon />,
    columns: [
      { field: "nombre_herramienta", headerName: "Herramienta", align: "center" },
      { field: "codigo", headerName: "Código", align: "center" },
      { field: "stock", headerName: "Total", align: "center" },
      { field: "ubicacion", headerName: "Ubicación", align: "center" },
    ],
  },
  rol: {
    title: "Rol",
    endpoint: "rol",
    description: "Gestiona los roles de usuario",
    icon: <AssignmentIcon />,
    columns: [{ field: "tipo", headerName: "Tipo de rol", align: "center" }],
  },
  ambiente: {
    title: "Ambiente",
    endpoint: "ambiente",
    description: "Gestiona los ambientes de la sede",
    icon: <WorkspacesIcon />,
    columns: [
      { field: "nombre_ambiente", headerName: "Nombre", align: "center" },
      { field: "codigo", headerName: "Código ambiente", align: "center" },
    ],
  },
  prestamo: {
    title: "Préstamo",
    endpoint: "prestamo",
    description: "Gestiona los préstamos de herramientas",
    icon: <HandshakeIcon />,
    columns: [
      { field: "usuario_id", headerName: "Usuario ID", align: "center" },
      { field: "herramienta_id", headerName: "Herramienta ID", align: "center" },
      { field: "cantidad", headerName: "Cantidad", align: "center" },
      { field: "fecha_prestamo", headerName: "Fecha Préstamo", align: "center" },
      { field: "fecha_devolucion", headerName: "Fecha Devolución", align: "center" },
    ],
  },
};

const Dashboard = () => {
  const { sede, logout } = useSede();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });


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

  const handleCreate = async (newData) => {
    if (!selectedEntity) return;

    try {
      await api.post(selectedEntity.endpoint, newData);
      showSnackbar(`${selectedEntity.title} creado exitosamente.`, "success");
      setReloadTable((prev) => !prev);
      handleCloseModal();
    } catch (error) {
      console.error(`Error al crear ${selectedEntity.title}:`, error);
      showSnackbar(`Hubo un problema al crear ${selectedEntity.title}.`, "error");
    }
  };

  return (
    <>
      <HeaderComponent title="Inicio" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Panel de Control
          </Typography>
        </Box>

        <Grid container spacing={3}>
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
            showSnackbar(`${selectedEntity.title} creado exitosamente.`, "success");
            setReloadTable((prev) => !prev);
          }}
          onError={() => {
            showSnackbar(`Hubo un problema al crear ${selectedEntity.title}.`, "error");
          }}
        />
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
