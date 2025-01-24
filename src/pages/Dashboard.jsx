/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import CardComponent from "../components/CardComponent";
import CreateElementsComponent from "../components/CreateElementsComponent";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReportIcon from "@mui/icons-material/Report";

// Datos dinámicos para las cards y modals
const cardData = [
  {
    title: "Usuarios",
    description: "Gestiona los usuarios del sistema.",
    icon: <PersonAddIcon />,
    columns: [
      { field: "nombre", headerName: "Nombre", align: "center" },
      { field: "apellido", headerName: "Apellido", align: "center" },
      { field: "identificacion", headerName: "ID", align: "center" },
      { field: "celular", headerName: "Celular", align: "center" },
      { field: "rol", headerName: "Rol", align: "center" },
      { field: "ficha", headerName: "Ficha", align: "center" },
      { field: "estado", headerName: "Estado", align: "center" },
    ],
  },
  {
    title: "Herramientas",
    description: "Gestiona los elementos del inventario.",
    icon: <Inventory2Icon />,
    columns: [
      { field: "id", headerName: "ID", align: "center" },
      { field: "nombre", headerName: "Nombre del Producto", align: "center" },
      { field: "cantidad", headerName: "Cantidad", align: "center" },
      { field: "ubicacion", headerName: "Ubicación", align: "center" },
    ],
  },
  {
    title: "Préstamos",
    description: "Gestiona los préstamos del sistema.",
    icon: <AssignmentIcon />,
    columns: [
      { field: "id", headerName: "ID", align: "center" },
      { field: "usuario", headerName: "Usuario", align: "center" },
      { field: "elemento", headerName: "Elemento", align: "center" },
      { field: "fecha", headerName: "Fecha de Préstamo", align: "center" },
      { field: "estado", headerName: "Estado", align: "center" },
    ],
  },
];

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Card seleccionada para el modal

  // Maneja la apertura del modal
  const handleOpenModal = (cardIndex) => {
    setSelectedCard(cardIndex);
    setOpenModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const handleCreateElement = (newData) => {
    console.log("Elemento creado:", newData);
    handleCloseModal();
  };

  return (
    <>
      <HeaderComponent title="Inicio" />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido al sistema de gestión
        </Typography>
        <Typography variant="body1" gutterBottom>
          Selecciona una opción para comenzar:
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardComponent
                title={card.title}
                description={card.description}
                icon={card.icon}
                onClick={() => handleOpenModal(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {selectedCard !== null && (
        <CreateElementsComponent
          open={openModal}
          onClose={handleCloseModal}
          title={`Crear ${cardData[selectedCard].title}`}
          columns={cardData[selectedCard].columns}
          onSubmit={handleCreateElement}
        />
      )}
    </>
  );
};

export default Dashboard;
