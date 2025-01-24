
import { Container, Box, Typography } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import TableComponent from '../components/TableComponent';

const Morosos = () => {
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
      <HeaderComponent title="Morosos" />
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Administra las personas que se encuentran en estado de mora.
          </Typography>
          <TableComponent
            columns={columns}
            data={data}
            title="Lista de morosos"
            noDataMessage="No hay personas en estado de mora."
          />
        </Box>
      </Container>
    </>
  );
};

export default Morosos;
