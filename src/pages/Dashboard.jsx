import {
  Typography,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import HeaderComponent from "../components/HeaderComponent";
import ModalComponent from "../components/modalComponent";

const Dashboard = () => {
  const columns = [
    { field: "nombre", headerName: "Nombre", align: "center" },
    { field: "apellido", headerName: "Apellido", align: "center" },
    { field: "identificacion", headerName: "ID", align: "center" },
    { field: "celular", headerName: "Celular", align: "center" },
    { field: "rol", headerName: "Rol", align: "center" },
    { field: "ficha", headerName: "Ficha", align: "center" },
    { field: "estado", headerName: "Estado", align: "left" },
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
  ];

  return (
    <>
      <HeaderComponent title="Emsat" />

      <ModalComponent open={true} onClose={() => {true}} title="Hola :)">
        <Typography variant="body1" gutterBottom>
          Aún estoy entendiendo como relacionar los modals
        </Typography>
      </ModalComponent>

      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Bienvenido al sistema de gestión de préstamos y herramientas.
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align || "left"}
                      sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.field}
                        align={column.align || "left"}
                        sx={{
                          color:
                            column.field === "estado"
                              ? row[column.field] === "Activo"
                                ? "green"
                                : "red"
                              : "inherit",
                          fontWeight:
                            column.field === "estado" ? "bold" : "normal",
                        }}
                      >
                        {row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
