import { Container, Box, Typography } from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import TableComponent from "../components/TableComponent";

const Dashboard = () => {
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
    {
      nombre: "Cristian",
      apellido: "Suarez",
      identificacion: "5678981",
      celular: "039383",
      rol: "Aprendiz",
      ficha: "2895270",
      estado: "Inactivo",
    },    {
      nombre: "Cristian",
      apellido: "Suarez",
      identificacion: "5678981",
      celular: "039383",
      rol: "Aprendiz",
      ficha: "2895270",
      estado: "Inactivo",
    },    {
      nombre: "Cristian",
      apellido: "Suarez",
      identificacion: "5678981",
      celular: "039383",
      rol: "Aprendiz",
      ficha: "2895270",
      estado: "Inactivo",
    },    {
      nombre: "Cristian",
      apellido: "Suarez",
      identificacion: "5678981",
      celular: "039383",
      rol: "Aprendiz",
      ficha: "2895270",
      estado: "Inactivo",
    },    {
      nombre: "Cristian",
      apellido: "Suarez",
      identificacion: "5678981",
      celular: "039383",
      rol: "Aprendiz",
      ficha: "2895270",
      estado: "Inactivo",
    },
  ];

  return (
    <>
      <HeaderComponent title="Emsat" />

      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Bienvenido a la plataforma de Emsat
          </Typography>
          <TableComponent
            columns={columns}
            data={data}
            title="Usuarios"
            noDataMessage="No se encontró información del usuario"
          />
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
