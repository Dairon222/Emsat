
import { Container, Box, Typography } from '@mui/material';
import HeaderComponent from '../components/HeaderComponent';
import TableComponent from '../components/TableComponent';

const Users = () => {
  const columns = [
    { field: 'name', headerName: 'Nombre', align: 'left' },
    { field: 'role', headerName: 'Rol', align: 'center' },
    { field: 'status', headerName: 'Estado', align: 'right' },
  ];

  const data = [
    { name: 'Carlos Pérez', role: 'Aprendiz', status: 'Activo' },
    { name: 'Lucía Gómez', role: 'Instructor', status: 'Inactivo' },
    { name: 'Miguel Torres', role: 'Aprendiz', status: 'Activo' },
  ];

  return (
    <>
      <HeaderComponent title="Gestión de Usuarios" />
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Administra los datos de los usuarios del sistema, incluyendo aprendices e instructores.
          </Typography>
          <TableComponent
            columns={columns}
            data={data}
            title="Lista de Usuarios"
            noDataMessage="No se encontraron usuarios."
          />
        </Box>
      </Container>
    </>
  );
};

export default Users;
