
import { Container, Box, Typography } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import TableComponent from '../components/TableComponent';

const Inventory = () => {
  const columns = [
    { field: 'tool', headerName: 'Herramienta', align: 'left' },
    { field: 'category', headerName: 'Categoría', align: 'center' },
    { field: 'availability', headerName: 'Disponibilidad', align: 'right' },
  ];

  const data = [
    { tool: 'Taladro', category: 'Eléctrica', availability: 'Disponible' },
    { tool: 'Llave Inglesa', category: 'Manual', availability: 'No Disponible' },
    { tool: 'Sierra', category: 'Eléctrica', availability: 'Disponible' },
  ];

  return (
    <>
      <HeaderComponent title="Gestión de Inventarios" />
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Administra las herramientas y recursos disponibles en el sistema.
          </Typography>
          <TableComponent
            columns={columns}
            data={data}
            title="Lista de Herramientas"
            noDataMessage="No se encontraron herramientas."
          />
        </Box>
      </Container>
    </>
  );
};

export default Inventory;
