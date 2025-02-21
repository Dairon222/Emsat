
import { Container, Typography, Box } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";
import api from "../api/axios"; // Asegúrate de que la ruta es correcta


const columns = [
  { field: "id", headerName: "Id", align: "center", hidden: true },
  { field: "usuario_id", headerName: "Id usuario", align: "center" },
  { field: "prestamo_id", headerName: "ID prestamo", align: "center" },
  { field: "estado", headerName: "Estado", align: "center" },
];

const fetchHistorial = async () => {
  const response = await api.get("/historial"); // Asegúrate de que el endpoint es correcto
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

        <TableComponent
          columns={columns}
          fetchData={fetchHistorial} // Pasar la función en lugar de un string
          title="Historial de los préstamos"
          noDataMessage="No se encontró algún dato relacionado."
          endpoint="historial"
          keyField="id"
          hiddenFields={["id", "created_at", "updated_at"]}
        />
      </Container>
    </>
  );
};

export default Historial;
