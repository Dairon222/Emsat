// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";
import CreateElementsComponent from "../components/CreateElementsComponent";

const Inventory = () => {
  const columns = [
    { field: "nombre_herramienta", headerName: "Herramienta", align: "center" },
    { field: "codigo", headerName: "Código", align: "center" },
    { field: "stock", headerName: "Total", align: "center" },
    { field: "ubicacion", headerName: "Ubicación", align: "center" },
    { field: "estado", headerName: "Estado", align: "center" },
  ];

  const data = [
    {
      nombre_herramienta: "Taladro",
      codigo: "201",
      stock: "10",
      ubicacion: "Bodega 1",
      estado: "Disponible",
    },
    {
      nombre_herramienta: "Computador Dell",
      codigo: "202",
      stock: "11",
      ubicacion: "Bodega 1",
      estado: "Disponible",
    },    {
      nombre_herramienta: "Carretilla",
      codigo: "203",
      stock: "2",
      ubicacion: "Bodega 1",
      estado: "Disponible",
    },    {
      nombre_herramienta: "Destornillador",
      codigo: "204",
      stock: "15",
      ubicacion: "Bodega 1",
      estado: "Disponible",
    },
  ];

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
      <HeaderComponent title="Herramientas" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 1 }}>
          <Typography variant="body1" gutterBottom sx={{ flexGrow: 1 }}>
            Administra las herramientas y elementos del inventario.
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
            Crear herramienta
          </Button>
        </Box>
        <TableComponent
          columns={columns}
          data={tableData}
          title="Lista de herramientas"
          noDataMessage="No se encontraron herramientas."
        />
      </Container>
      <CreateElementsComponent
        open={openModal}
        onClose={handleCloseModal}
        title="Crear herramienta"
        columns={columns}
        onSubmit={handleCreate}
      />
    </>
  );
};
export default Inventory;
