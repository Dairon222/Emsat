import { Container, Box, Typography } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";

const Morosos = () => {
  const columns = [
    { field: "nombre", headerName: "Nombre", align: "center" },
    { field: "apellido", headerName: "Apellido", align: "center" },
    { field: "identificacion", headerName: "ID", align: "center" },
    { field: "celular", headerName: "Celular", align: "center" },
    { field: "elemento", headerName: "Elemento Prestado", align: "center" },
    {
      field: "fechaPrestamo",
      headerName: "Fecha de Préstamo",
      align: "center",
    },
    {
      field: "fechaVencimiento",
      headerName: "Fecha de Vencimiento",
      align: "center",
    },
    { field: "estado", headerName: "Estado", align: "center" },
  ];
  const data = [
    {
      nombre: "Dairon",
      apellido: "Betancur",
      identificacion: "123456789",
      celular: "3053397412",
      elemento: "Computador",
      fechaPrestamo: "2025-01-01",
      fechaVencimiento: "2025-01-10",
      estado: "En mora",
    },
  ];

  return (
    <>
      <HeaderComponent title="Morosos" />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Administra las personas que se encuentran en estado de mora.
          </Typography>
          <TableComponent
            columns={columns}
            data={data}
            title="Lista de morosos"
            noDataMessage="No se encuentran morosos."
          />
        </Box>
      </Container>
    </>
  );
};

export default Morosos;
