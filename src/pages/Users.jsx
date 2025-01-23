// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Container, Typography, Grid, Button } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";
import CreateElementsComponent from "../components/CreateElementsComponent";

const columns = [
  { field: "nombre", headerName: "Nombre", align: "center" },
  { field: "apellido", headerName: "Apellido", align: "center" },
  { field: "identificacion", headerName: "ID", align: "center" },
  { field: "celular", headerName: "Celular", align: "center" },
  { field: "rol", headerName: "Rol", align: "center" },
  { field: "ficha", headerName: "Ficha", align: "center" },
  { field: "estado", headerName: "Estado", align: "center" },
];

const data = [
  {
    nombre: "Dairon",
    apellido: "Betancur",
    identificacion: "123456789",
    celular: "3053397412",
    rol: "Aprendiz",
    ficha: "2895270",
    estado: "Activo",
  },
  {
    nombre: "Cristian",
    apellido: "Cardona",
    identificacion: "89231",
    celular: "929481010",
    rol: "Aprendiz",
    ficha: "2895270",
    estado: "Activo",
  },
  {
    nombre: "Cristian",
    apellido: "Suarez",
    identificacion: "5678981",
    celular: "039383",
    rol: "Aprendiz",
    ficha: "2895270",
    estado: "Inactivo",
  },
  {
    nombre: "Michael",
    apellido: "Aviel",
    identificacion: "1112",
    celular: "000121",
    rol: "Instructor",
    ficha: "2225270",
    estado: "Activo",
  },
  {
    nombre: "Juliana",
    apellido: "Calderón",
    identificacion: "233",
    celular: "12345009",
    rol: "Aprendiz",
    ficha: "2222120",
    estado: "Activo",
  },
];

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tableData, setTableData] = useState(data);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreate = (newData) => {
    setTableData((prevData) => [...prevData, newData]); // Agrega nuevos datos
    console.log("Nuevo elemento creado:", newData);
  };

  return (
    <>
      <HeaderComponent title="Usuarios" />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={handleOpenModal}
        >
          Crear usuario
        </Button>
        <TableComponent
          columns={columns}
          data={tableData}
          title="Lista de Usuarios"
          noDataMessage="No se encontraron usuarios."
        />
      </Container>
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Crear Usuario"
        columns={columns}
        onSubmit={handleCreate}
      />
    </>
  );
};

export default Dashboard;
