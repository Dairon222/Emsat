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

const Dashboard = () => {
  const columns = [
    { field: "name", headerName: "Nombre", align: "left" },
    { field: "role", headerName: "Rol", align: "center" },
    { field: "status", headerName: "Estado", align: "right" },
  ];

  const data = [
    { name: "Dairon Betancur", role: "Frontend", status: "Activo" },
    { name: "Cristian Cardona", role: "Tester", status: "Inactivo" },
    { name: "Cristian Suarez", role: "Backend", status: "Activo" },
    { name: "Michael Aviel", role: "Project Manager", status: "Activo" },
    { name: "Dairon Betancur", role: "Frontend", status: "Activo" },
    { name: "Dairon Betancur", role: "Frontend", status: "Activo" },
    { name: "Dairon Betancur", role: "Frontend", status: "Inactivo" },
    { name: "Dairon Betancur", role: "Frontend", status: "Inactivo" },
  ];

  return (
    <>
      <HeaderComponent title="Emsat" />
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
                            column.field === "status"
                              ? row[column.field] === "Activo"
                                ? "green"
                                : "red"
                              : "inherit",
                          fontWeight:
                            column.field === "status" ? "bold" : "normal",
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
