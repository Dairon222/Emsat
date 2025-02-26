
import { Container, Typography, Box } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableHistorial   from "../components/TableHistorialComponent";
import api from "../api/axios"; 

const columns = [
  { field: "usuario_id", headerName: "Id usuario", align: "center" },
  { field: "prestamo_id", headerName: "ID prestamo", align: "center" },
  // Pendiente para orgnanizar la forma en que se ve la fecha
  { field: "created_at", headerName: "Fecha de creación", align: "center" },
  { field: "estado", headerName: "Estado", align: "center" },
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
