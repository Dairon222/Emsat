
import { Typography, Container, Box, Button } from '@mui/material';

const Users = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <Typography variant="body1" gutterBottom>
          Administra los datos de usuarios, como aprendices e instructores.
        </Typography>
        <Button variant="contained" color="primary">
          Agregar Usuario
        </Button>
      </Box>
    </Container>
  );
};

export default Users;
