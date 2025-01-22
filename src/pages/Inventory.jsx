
import { Container, Box, Typography } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import TableComponent from '../components/TableComponent';

const Inventory = () => {
  const columns = [
    { field: 'nombre', headerName: 'Herramienta', align: 'center' },
    { field: 'categoria', headerName: 'Categoría', align: 'center' },
    { field: 'estado', headerName: 'Disponibilidad', align: 'center' },
  ];

  const data = [
    { nombre: 'Taladro', categoria: 'Eléctrica', estado: 'Disponible' },
    { nombre: 'Llave Inglesa', categoria: 'Manual', estado: 'No disponible' },
    { nombre: 'Sierra', categoria: 'Eléctrica', estado: 'Disponible' },
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
