import { Container, Typography, Box } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableHistorial from "../components/TableHistorialComponent";
import api from "../api/axios";
import dayjs from "dayjs";

const columns = [
  { field: "usuario.nombre", headerName: "Nombre", align: "center" },
  { field: "usuario.apellido", headerName: "Apellido", align: "center" },
  {
    field: "usuario.identificacion",
    headerName: "Identificacion",
    align: "center",
  },
  { field: "usuario.celular", headerName: "Celular", align: "center" },
  {
    field: "prestamo.codigo_herramienta",
    headerName: "Herramienta",
    align: "center",
  },
  { field: "prestamo.cantidad", headerName: "Total", align: "center" },
  {
    field: "created_at",
    headerName: "Fecha del préstamo",
    align: "center",
    format: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
  },
  { field: "estado", headerName: "Estado", align: "center",  },
];

const fetchHistorial = async () => {
  const response = await api.get("historial");
  return response.data;
};

const Historial = () => {
  return (
    <>
      <HeaderComponent title="Historial" />
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
            Historial de los datos de los préstamos.
          </Typography>
        </Box>

        <TableHistorial
          columns={columns}
          fetchData={fetchHistorial}
          title="Historial de los préstamos"
          noDataMessage="No se encontró algún dato relacionado."
        />
      </Container>
    </>
  );
};

export default Historial;
