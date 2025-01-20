
import { Typography, Container, Box, Button } from '@mui/material';

const Inventory = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Inventarios
        </Typography>
        <Typography variant="body1" gutterBottom>
          Administra las herramientas y ambientes disponibles en el sistema.
        </Typography>
        <Button variant="contained" color="primary">
          Agregar Herramienta
        </Button>
      </Box>
    </Container>
  );
};

export default Inventory;
