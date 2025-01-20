
import { Typography, Container, Box, Button } from '@mui/material';

const Loans = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Préstamos
        </Typography>
        <Typography variant="body1" gutterBottom>
          Administra los préstamos de herramientas y su seguimiento.
        </Typography>
        <Button variant="contained" color="primary">
          Registrar Préstamo
        </Button>
      </Box>
    </Container>
  );
};

export default Loans;
