import { Container, Box, Typography } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";

const Loans = () => {
  const columns = [
    { field: "codigo_herramienta", headerName: "Código herramienta", align: "center" },
    { field: "cantidad", headerName: "Cantidad", align: "center" },
    { field: "estado", headerName: "Estado", align: "center" },
    { field: "observaciones", headerName: "Observaciones", align: "center" },
  ];

  const data = [
    { codigo_herramienta: "Taladro", cantidad: "Carlos Pérez", estado: "Activo", observaciones: "Ninguna" },
    { codigo_herramienta: "Sierra", cantidad: "Lucía Gómez", estado: "Activo", observaciones: "Ninguna" },
    { codigo_herramienta: "Llave Inglesa", cantidad: "Miguel Torres", estado: "Activo", observaciones: "Ninguna" }  ,
  ];

  return (
    <>
      <HeaderComponent title="Préstamos" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Administra los préstamos realizados, incluyendo herramientas,
            usuarios y fechas de devolución.
          </Typography>
          <TableComponent
            columns={columns}
            data={data}
            title="Lista de Préstamos"
            noDataMessage="No se encontraron préstamos."
          />
        </Box>
      </Container>
    </>
  );
};

export default Loans;
