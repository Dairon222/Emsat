
import { Container, Box, Typography } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import TableComponent from '../components/TableComponent';

const Loans = () => {
  const columns = [
    { field: 'tool', headerName: 'Herramienta', align: 'left' },
    { field: 'user', headerName: 'Usuario', align: 'center' },
    { field: 'returnDate', headerName: 'Fecha de Devolución', align: 'right' },
  ];

  const data = [
    { tool: 'Taladro', user: 'Carlos Pérez', returnDate: '2025-01-25' },
    { tool: 'Sierra', user: 'Lucía Gómez', returnDate: '2025-01-28' },
    { tool: 'Llave Inglesa', user: 'Miguel Torres', returnDate: '2025-01-30' },
  ];

  return (
    <>
      <HeaderComponent title="Gestión de Préstamos" />
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Administra los préstamos realizados, incluyendo herramientas, usuarios y fechas de devolución.
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
